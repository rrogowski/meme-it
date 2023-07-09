export const createWebSocketConnection = ({ url, onData }) => {
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
