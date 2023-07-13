import { createHash } from "crypto";
import { URL } from "url";

const END_OF_HTTP_RESPONSE = "\n\n";
const WEB_SOCKET_FIN_FLAG = 0x80;
const WEB_SOCKET_GUID = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
const WEB_SOCKET_OPT_CODE_TEXT = 0x01;

const sockets = [];

let onConnectCallback;
let onDisconnectCallback;

export const upgrade = (request, socket) => {
  const userAgent = request.headers["user-agent"];
  console.debug(`Accepting upgrade from: ${userAgent}`);

  const response = generateAcceptanceResponse(request);
  socket.write(response);
  sockets.push(socket);

  const url = new URL(request.url, `ws://${request.headers.host}`);
  const name = url.searchParams.get("name");
  const isHost = name === null;
  onConnectCallback({ isHost, name });

  socket.on("readable", () => {
    // HACK: Even though the client is not sending data through the socket, there
    // still seems to be readable data present. A readable stream (i.e. the socket)
    // cannot end if there is data left to be read.
    socket.read();
  });
  socket.on("error", (error) => {
    console.error(error);
    sockets.splice(sockets.indexOf(socket), 1);
    onDisconnectCallback({ isHost, name });
  });
  socket.on("end", () => {
    sockets.splice(sockets.indexOf(socket), 1);
    onDisconnectCallback({ isHost, name });
  });
};

export const onConnect = (callback) => {
  onConnectCallback = callback;
};

export const onDisconnect = (callback) => {
  onDisconnectCallback = callback;
};

export const broadcast = (data) => {
  sockets.forEach((socket) => {
    let frame = JSON.stringify(data);
    while (frame.length > 0) {
      sendTextFrame(socket, frame.slice(0, 125));
      frame = frame.slice(125);
    }
  });
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
