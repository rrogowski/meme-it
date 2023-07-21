import { dispatch } from "./store.js";

let isOpen = false;
let stream = "";

export const initializeWebSocket = (options = {}) => {
  if (isOpen) {
    return;
  }
  const searchParams = new URLSearchParams(options);
  const url = `ws://${window.location.hostname}:9000/?${searchParams}`;
  const socket = new WebSocket(url);
  socket.addEventListener("open", () => {
    console.debug("[SOCKET] open");
    isOpen = true;
  });
  socket.addEventListener("message", (event) => {
    console.debug("[SOCKET] message", event.data);
    stream += event.data;
    const updates = tryJsonParse(stream);
    if (updates !== null) {
      stream = "";
      dispatch({ type: "SERVER_SYNCED", payload: updates });
    }
  });
  socket.addEventListener("close", () => {
    console.debug("[SOCKET] close");
    stream = "";
    dispatch({ type: "WEB_SOCKET_CLOSED" });
    if (isOpen) {
      isOpen = false;
      console.debug("[SOCKET] reconnect");
      initializeWebSocket(options);
    }
  });
};

const tryJsonParse = (body) => {
  try {
    return JSON.parse(body);
  } catch {
    return null;
  }
};
