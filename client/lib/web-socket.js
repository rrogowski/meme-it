const WEB_SOCKET_URL = `ws://${window.location.hostname}:8000`;

export const createWebSocketConnection = ({ isHost, name, onData }) => {
  const searchParams = new URLSearchParams({ isHost, name });
  const url = `${WEB_SOCKET_URL}/?${searchParams}`;
  const socket = new WebSocket(url);
  socket.addEventListener("message", ({ data: frame }) => {
    parseNextTextFrame(frame, onData);
  });
  socket.addEventListener("close", () => {
    onData({ phase: null });
  });
};

let body = "";
const parseNextTextFrame = (frame, onData) => {
  body += frame;
  const data = tryJsonParse(body);
  if (data) {
    body = "";
    onData(data);
  }
};

const tryJsonParse = (body) => {
  try {
    return JSON.parse(body);
  } catch {
    return null;
  }
};
