import { post } from "../api/http.js";
import { createWebSocketConnection } from "../api/socket.js";
import { getArrayBufferFromDataURL } from "../lib/file.js";
import { createState } from "../lib/state.js";
import { client } from "./client.mjs";

export const server = createState({
  get canCaption() {
    const { isHost, name } = client.state;
    const { captioners, isUploader } = server.state;
    const didCaption = captioners.includes(name);
    return !isHost && !isUploader && !didCaption;
  },
  get caption() {
    const { captions, index } = server.state;
    return captions[index];
  },
  get captioners() {
    const { captions } = server.state;
    return captions.map(({ author }) => author);
  },
  get hasNext() {
    const { captions, index } = server.state;
    return index < captions.length - 1;
  },
  get hasPrevious() {
    const { index } = server.state;
    return index > 0;
  },
  get pendingCaptioners() {
    const { captioners, names, uploader } = server.state;
    return names
      .filter((name) => name !== uploader)
      .filter((name) => !captioners.includes(name));
  },
  get isUploader() {
    const { name } = client.state;
    const { uploader } = server.state;
    return name === uploader;
  },
  get unviewedCaptions() {
    const { captions } = server.state;
    return captions.filter(({ wasViewed }) => !wasViewed);
  },
});

server.actions = {
  connect() {
    createWebSocketConnection({
      isHost: client.state.isHost,
      name: client.state.name,
      onData: server.setState,
    });
  },
  decideWinner() {
    post("/winner");
  },
  getNextCaption() {
    post("/next");
  },
  getPreviousCaption() {
    post("/previous");
  },
  uploadCaption() {
    const {
      name,
      caption: { bottomText, topText },
    } = client.state;
    const caption = { author: name, bottomText, topText };
    post("/caption", JSON.stringify(caption));
  },
  uploadImage() {
    getArrayBufferFromDataURL(client.state.preview, (result) => {
      post("/upload", result);
    });
  },
};
