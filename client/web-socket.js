import { setState } from "./state.js";

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
    setState(data);
  }
};

const onClose = () => {
  body = "";
  setState({ bottomText: "", phase: null, preview: "", topText: "" });
};

const tryJsonParse = (body) => {
  try {
    return JSON.parse(body);
  } catch {
    return null;
  }
};
