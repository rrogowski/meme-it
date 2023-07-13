import { getArrayBufferFromDataURL, readFileAsDataURL } from "./file.js";
import { post } from "./http.js";
import { getCurrentState, setState } from "./state.js";
import { initializeWebSocket } from "./web-socket.js";

export const actions = {
  decideWinner() {
    post("/winner");
  },
  goToNextCaption() {
    post("/next");
  },
  goToPrevCaption() {
    post("/prev");
  },
  joinAsHost() {
    initializeWebSocket();
  },
  joinAsPlayer() {
    const { name } = getCurrentState();
    initializeWebSocket({ name });
  },
  openFileDialog() {
    const fileInput = document.querySelector("input[type=file]");
    const event = new window.MouseEvent("click");
    fileInput.dispatchEvent(event);
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
    if (!file) {
      setState({ preview: "" });
      return;
    }
    readFileAsDataURL(file, (result) => {
      setState({ preview: result });
    });
  },
  setTopText(event) {
    setState({ topText: event.target.value });
  },
  uploadCaption() {
    const { bottomText, name, topText } = getCurrentState();
    const caption = { author: name, bottomText, topText };
    post("/caption", JSON.stringify(caption));
  },
  uploadImage() {
    const { preview } = getCurrentState();
    getArrayBufferFromDataURL(preview, (result) => {
      post("/upload", result);
    });
  },
};
