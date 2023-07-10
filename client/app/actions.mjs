import { readFileAsDataURL } from "../lib/file.mjs";
import { getArrayBufferFromDataURL } from "../lib/file.mjs";
import { post } from "../lib/http.mjs";
import { createWebSocketConnection } from "../lib/web-socket.mjs";

export const createActions = ({ state, setState }) => {
  return {
    connectToServer() {
      const { isHost, name } = state;
      const searchParams = new URLSearchParams(isHost ? { isHost } : { name });
      const url = `ws://${window.location.hostname}:8000/?${searchParams}`;
      createWebSocketConnection({ url, onData: setState });
    },
    decideWinner() {
      post("/winner");
    },
    goToNextCaption() {
      post("/next");
    },
    goToPrevCaption() {
      post("/prev");
    },
    revealMemes() {
      post("/reveal");
    },
    setBottomText(event) {
      setState({ bottomText: event.target.value });
    },
    setName(event) {
      setState({ name: event.target.value });
    },
    setPreview(event) {
      const file = event.target.files[0];
      readFileAsDataURL(file, (result) => {
        setState({ preview: result });
      });
    },
    setTopText(event) {
      setState({ topText: event.target.value });
    },
    uploadCaption() {
      const { bottomText, name, topText } = state;
      const caption = { author: name, bottomText, topText };
      post("/caption", JSON.stringify(caption));
    },
    uploadImage() {
      const { preview } = state;
      getArrayBufferFromDataURL(preview, (result) => {
        post("/upload", result);
      });
    },
  };
};
