import { setState } from "./state.js";

export const openWebSocket = (options = {}) => {
  const searchParams = new URLSearchParams(options);
  const url = `ws://${window.location.hostname}:8000/?${searchParams}`;
  const webSocket = new window.WebSocket(url);
  webSocket.addEventListener("message", handleMessage);
  webSocket.addEventListener("close", closeConnection);
};

let bodyStream = "";

const handleMessage = (event) => {
  bodyStream += event.data;
  const updates = tryJsonParse(bodyStream);
  if (updates !== null) {
    bodyStream = "";
    setState(updates);
  }
};

const closeConnection = () => {
  bodyStream = "";
  setState({ bottomText: "", phase: null, preview: "", topText: "" });
};

const tryJsonParse = (body) => {
  try {
    return JSON.parse(body);
  } catch {
    return null;
  }
};
