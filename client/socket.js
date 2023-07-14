import { dispatch } from "./store.js";

let stream = "";

export const initializeWebSocket = (options = {}) => {
  const searchParams = new URLSearchParams(options);
  const url = `ws://${window.location.hostname}:8000/?${searchParams}`;
  const socket = new WebSocket(url);
  socket.addEventListener("message", onMessage);
  socket.addEventListener("close", onClose);
};

const onMessage = (event) => {
  stream += event.data;
  const updates = tryJsonParse(stream);
  if (updates !== null) {
    stream = "";
    dispatch({ type: "SERVER_SYNCED", payload: updates });
  }
};

const onClose = () => {
  stream = "";
  dispatch({ type: "WEB_SOCKET_CLOSED" });
};

const tryJsonParse = (body) => {
  try {
    return JSON.parse(body);
  } catch {
    return null;
  }
};
