import { dispatch } from "./store.js";

export const initializeWebSocket = (options = {}) => {
  const searchParams = new URLSearchParams(options);
  const url = `ws://${window.location.hostname}:8000/?${searchParams}`;
  const webSocket = new window.WebSocket(url);
  webSocket.addEventListener("message", onMessage);
  webSocket.addEventListener("close", onClose);
};

let body = "";

const onMessage = (event) => {
  body += event.data;
  const data = tryJsonParse(body);
  if (data !== null) {
    body = "";
    dispatch(data);
  }
};

const onClose = () => {
  body = "";
  dispatch({ type: "WEB_SOCKET_CLOSED" });
};

const tryJsonParse = (body) => {
  try {
    return JSON.parse(body);
  } catch {
    return null;
  }
};
