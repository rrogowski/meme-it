import { setServerState } from "../lib/state.js";

export const createWebSocketConnection = ({ isHost, name }) => {
  const searchParams = new URLSearchParams({ isHost, name });
  const socket = new WebSocket(`ws://localhost:8000/?${searchParams}`);
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
