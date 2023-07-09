import { createHash } from "crypto";
import { lookup } from "dns";
import { createServer } from "http";
import { hostname } from "os";
import { URL } from "url";

const PORT = 8000;
const WEB_SOCKET_GUID = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";

let serverAddress = null;

const handleWebSocketUpgrade = (request, socket) => {
  acceptWebSocketUpgrade(request, socket);
  handleWebSocketConnect(request, socket);
};

const acceptWebSocketUpgrade = (request, socket) => {
  const END_OF_HTTP_RESPONSE = "\n".repeat(2);
  const responseHeaders = [
    "HTTP/1.1 101 Web Socket Protocol Handshake",
    "Upgrade: WebSocket",
    "Connection: Upgrade",
    `Sec-WebSocket-Accept: ${generateWebsocketAcceptKey(request)}`,
  ];
  const response = responseHeaders.join("\n").concat(END_OF_HTTP_RESPONSE);
  socket.write(response);
};

const webSocketConnections = [];

const INITIAL_STATE = {
  captions: [],
  index: null,
  names: [],
  phase: "SELECT_IMAGE",
  winner: null,
};

let gameState = INITIAL_STATE;

const updateGameState = (action) => {
  console.log("action:", action);
  const updates = applyPartialReducer(gameState, action);
  gameState = { ...gameState, ...updates };
  console.log("new game state:", gameState);
  console.log();
  webSocketConnections.forEach((socket) => {
    // console.log(`text frame is ${JSON.stringify(gameState).length} bytes`);
    let frame = JSON.stringify(gameState);
    while (frame.length > 0) {
      sendTextFrame(socket, frame.slice(0, 125));
      frame = frame.slice(125);
    }
  });
};

const WEB_SOCKET_FIN_FLAG = 0x80;
const WEB_SOCKET_OPT_CODE_TEXT = 0x01;

const sendTextFrame = function (socket, text) {
  console.log("allocating", text.length);
  const payload = Buffer.alloc(text.length);
  payload.write(text);
  const firstByte = WEB_SOCKET_FIN_FLAG | WEB_SOCKET_OPT_CODE_TEXT;
  const secondByte = text.length; // mask and payload len
  let frame = Buffer.concat([
    Buffer.from([firstByte]),
    Buffer.from([secondByte]),
    payload,
  ]);

  console.log(`sending ${frame.length} bytes`);

  socket.write(frame);
};

const applyPartialReducer = (state, action) => {
  switch (action.type) {
    case "IMAGE_UPLOADED":
      imageNumber++;
      return {
        phase: "CAPTION_IMAGE",
        captions: [],
        src: `http://${serverAddress}:${PORT}/image/${imageNumber}`,
      };
    case "PLAYER_CONNECTED":
      return {
        names: state.names.concat(action.payload.name),
        uploader: state.uploader ?? action.payload.name,
      };
    case "PLAYER_DISCONNECTED":
      return {
        names: state.names.filter((name) => name !== action.payload.name),
        uploader:
          state.uploader === action.payload.name ? null : state.uploader,
      };
    case "CAPTION_SUBMITTED":
      return { captions: state.captions.concat(action.payload) };
    case "REVEAL_MEMES":
      shuffleArray(state.captions);
      return {
        captions: [
          { ...state.captions[0], wasViewed: true },
          ...state.captions.slice(1),
        ],
        index: 0,
        phase: "REVEAL_MEMES",
      };
    case "NEXT_CAPTION":
      return {
        index: state.index + 1,
        captions: [
          ...state.captions.slice(0, state.index + 1),
          { ...state.captions[state.index + 1], wasViewed: true },
          ...state.captions.slice(state.index + 2),
        ],
      };
    case "PREVIOUS_CAPTION":
      return {
        index: state.index - 1,
      };
    case "WINNER_SELECTED":
      console.log("winner", state.index);
      return {
        phase: "SHOW_WINNER",
        winner: state.captions[state.index].name,
      };
    case "ROUND_RESET":
      const names = state.names.slice(1).concat(state.names[0]);
      return { ...INITIAL_STATE, names, uploader: names[0] };
  }
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const handleWebSocketConnect = (request, socket) => {
  webSocketConnections.push(socket);
  console.log(`total web socket connections: ${webSocketConnections.length}`);

  const url = new URL(request.url, `ws://${request.headers.host}`);
  const name = url.searchParams.get("name");
  const isHost = url.searchParams.get("isHost");
  if (isHost === "true") {
    updateGameState({ type: "HOST_CONNECTED", payload: {} });
  } else {
    updateGameState({ type: "PLAYER_CONNECTED", payload: { name } });
  }

  // NOTE: A readable stream cannot end if there is data left to be read.
  socket.on("readable", () => {
    socket.read();
  });

  socket.on("end", () => {
    handleWebSocketDisconnect(request, socket);
  });
};

const handleWebSocketDisconnect = (request, socket) => {
  webSocketConnections.splice(webSocketConnections.indexOf(socket), 1);
  console.log(`total web socket connections: ${webSocketConnections.length}`);

  const url = new URL(request.url, `ws://${request.headers.host}`);
  const name = url.searchParams.get("name");
  if (name === "host") {
    updateGameState({ type: "HOST_DISCONNECTED", payload: {} });
  } else {
    updateGameState({ type: "PLAYER_DISCONNECTED", payload: { name } });
  }
};

const generateWebsocketAcceptKey = (request) => {
  const key = request.headers["sec-websocket-key"];
  const sha1 = createHash("sha1");
  sha1.update(key + WEB_SOCKET_GUID);
  return sha1.digest("base64");
};

let image = null;
let imageNumber = 0;

const server = createServer((request, response) => {
  switch (request.url) {
    case "/upload":
      let chunks = [];
      request.on("data", (chunk) => {
        chunks.push(chunk);
      });
      request.on("end", () => {
        image = Buffer.concat(chunks);
        updateGameState({ type: "IMAGE_UPLOADED" });
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.end();
      });
      break;
    case `/image/${imageNumber}`:
      response.setHeader("Access-Control-Allow-Origin", "*");
      response.setHeader("Content-Type", "image/png");
      response.write(image);
      response.end();
      break;
    case "/caption": {
      let chunks = [];
      request.on("data", (chunk) => {
        chunks.push(chunk);
      });
      request.on("end", () => {
        response.setHeader("Access-Control-Allow-Origin", "*");
        const body = Buffer.concat(chunks).toString();
        updateGameState({
          type: "CAPTION_SUBMITTED",
          payload: JSON.parse(body),
        });
        response.end();
      });
      break;
    }
    case "/next":
      response.setHeader("Access-Control-Allow-Origin", "*");
      updateGameState({ type: "NEXT_CAPTION" });
      response.end();
      break;
    case "/prev":
      response.setHeader("Access-Control-Allow-Origin", "*");
      updateGameState({ type: "PREVIOUS_CAPTION" });
      response.end();
      break;
    case "/reveal":
      response.setHeader("Access-Control-Allow-Origin", "*");
      updateGameState({ type: "REVEAL_MEMES" });
      response.end();
      break;
    case "/winner":
      response.setHeader("Access-Control-Allow-Origin", "*");
      updateGameState({ type: "ROUND_RESET" });
      response.end();
      break;
  }
});

server.on("upgrade", handleWebSocketUpgrade);

lookup(hostname(), (error, _serverAddress) => {
  if (error) {
    console.error(error);
    return;
  }
  serverAddress = _serverAddress;
  server.listen(PORT, () => {
    console.log(`Server running at http://${_serverAddress}:${PORT}`);
  });
});