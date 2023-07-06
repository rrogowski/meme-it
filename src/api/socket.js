import { setServerState } from "../lib/state.js";

const SERVER_HREF = `ws://${window.location.hostname}:8000`;

export const createWebSocketConnection = ({ isHost, name }) => {
  const searchParams = new URLSearchParams({ isHost, name });
  const webSocketUrl = SERVER_HREF.concat(`/${searchParams}`);
  const socket = new WebSocket(webSocketUrl);
  let body = "";
  socket.addEventListener("message", ({ data }) => {
    let updates;
    try {
      updates = JSON.parse(body.concat(data));
      body = "";
    } catch {
      body += data;
    }
    if (updates) {
      setServerState(updates);
    }
  });
  socket.addEventListener("close", () => {
    setServerState({ phase: null });
  });
};
