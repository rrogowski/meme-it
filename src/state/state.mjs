import { createWebSocketConnection } from "../api/socket.js";
import { createState } from "../lib/state.js";

export const client = createState();
export const server = createState();

Object.assign(client.state, {
  get isHost() {
    return !client.state.name;
  },
  get isUploader() {
    return client.state.name === server.state.uploader;
  },
});

client.actions = {
  setName(event) {
    client.setState({ name: event.target.value });
  },
};

server.actions = {
  connect() {
    createWebSocketConnection({
      isHost: client.state.isHost,
      name: client.state.name,
      onData: server.setState,
    });
  },
};
