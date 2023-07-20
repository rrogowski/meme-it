import { dispatch, getState } from "./store.js";

let stream = "";
let socketState = {};

export const initializeWebSocket = (options = {}) => {
  const searchParams = new URLSearchParams(options);
  const url = `ws://${window.location.hostname}:9000/?${searchParams}`;
  const socket = new WebSocket(url);
  socketState.didOpen = false;
  socketState.options = options;
  socket.addEventListener("open", onOpen);
  socket.addEventListener("message", onMessage);
  socket.addEventListener("close", onClose);
};

const onOpen = () => {
  console.debug("[SOCKET] open");
  socketState.didOpen = true;
};

const onMessage = (event) => {
  console.debug("[SOCKET] message", event.data);
  stream += event.data;
  const updates = tryJsonParse(stream);
  if (updates !== null) {
    stream = "";
    dispatch({ type: "SERVER_SYNCED", payload: updates });
  }
};

const onClose = () => {
  console.debug("[SOCKET] close");
  stream = "";
  dispatch({ type: "WEB_SOCKET_CLOSED" });
  if (socketState.didOpen) {
    console.debug("[SOCKET] reconnect");
    initializeWebSocket(socketState.options);
  }
};

const tryJsonParse = (body) => {
  try {
    return JSON.parse(body);
  } catch {
    return null;
  }
};
