import { createHash } from "node:crypto";
import { URL } from "node:url";
import { dispatch, getState } from "./store.js";

const END_OF_HTTP_RESPONSE = "\n\n";
const WEB_SOCKET_FIN_FLAG = 0x80;
const WEB_SOCKET_GUID = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
const WEB_SOCKET_OPT_CODE_TEXT = 0x01;

const sockets = [];

export const acceptWebSocketUpgrade = (request, socket) => {
  const response = generateAcceptanceResponse(request);
  socket.write(response);
  sockets.push(socket);
  console.debug("[SOCKET] open");

  const url = new URL(request.url, `ws://${request.headers.host}`);
  const name = url.searchParams.get("name");
  const isHost = name === null;
  if (isHost) {
    dispatch({ type: "HOST_CONNECTED" });
  } else {
    dispatch({ type: "PLAYER_CONNECTED", payload: name });
  }

  socket.on("readable", () => {
    // HACK: Even though the client is not sending data through the socket, there
    // still seems to be readable data present. A readable stream (i.e. the socket)
    // cannot end if there is data left to be read.
    socket.read();
  });
  socket.on("error", (error) => {
    console.debug("[SOCKET] error", error);
    socket.emit("end");
  });
  socket.on("end", () => {
    console.debug("[SOCKET] end");
    sockets.splice(sockets.indexOf(socket), 1);
    if (isHost) {
      dispatch({ type: "HOST_DISCONNECTED" });
    } else {
      dispatch({ type: "PLAYER_DISCONNECTED", payload: name });
    }
  });
};

export const broadcastState = () => {
  const state = getState();
  let frame = JSON.stringify(state);
  while (frame.length > 0) {
    sockets.forEach((socket) => {
      sendTextFrame(socket, frame.slice(0, 125));
    });
    frame = frame.slice(125);
  }
};

const generateAcceptanceResponse = (request) => {
  const acceptanceKey = generateAcceptanceKey(request);
  const responseHeaders = [
    "HTTP/1.1 101 Web Socket Protocol Handshake",
    "Upgrade: WebSocket",
    "Connection: Upgrade",
    `Sec-WebSocket-Accept: ${acceptanceKey}`,
  ];
  return responseHeaders.join("\n").concat(END_OF_HTTP_RESPONSE);
};

const generateAcceptanceKey = (request) => {
  const key = request.headers["sec-websocket-key"];
  const sha1 = createHash("sha1");
  sha1.update(key + WEB_SOCKET_GUID);
  return sha1.digest("base64");
};

const sendTextFrame = function (socket, text) {
  const payload = Buffer.alloc(text.length);
  payload.write(text);
  const firstByte = WEB_SOCKET_FIN_FLAG | WEB_SOCKET_OPT_CODE_TEXT;
  const secondByte = text.length; // mask and payload len
  let frame = Buffer.concat([
    Buffer.from([firstByte]),
    Buffer.from([secondByte]),
    payload,
  ]);
  socket.write(frame);
};
