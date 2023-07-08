import { getArrayBufferFromDataURL, readFileAsDataURL } from "../api/file.js";
import { uploadImage } from "../api/http.js";
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
  openFileDialog() {
    const fileInput = document.querySelector("input[type=file]");
    const event = new MouseEvent("click");
    fileInput.dispatchEvent(event);
  },
  setPreview(event) {
    const file = event.target.files[0];
    readFileAsDataURL(file, (result) => {
      client.setState({ preview: result });
    });
  },
  setName(event) {
    client.setState({ name: event.target.value });
  },
  submitImage() {
    getArrayBufferFromDataURL(client.state.preview, (result) => {
      uploadImage(result);
    });
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
