import { post } from "./http.js";
import { getArrayBufferFromDataURL, readFileAsDataURL } from "./file.js";
import { dispatch, getCurrentState, state } from "./store.js";
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
    const payload = { bottomText: event.target.value };
    dispatch({ type: "BOTTOM_TEXT_CHANGED", payload });
  },
  setName(event) {
    const payload = { name: event.target.value };
    dispatch({ type: "NAME_UPDATED", payload });
  },
  setPreview(event) {
    const file = event.target.files[0];
    if (!file) {
      const payload = { preview: "" };
      dispatch({ type: "PREVIEW_UPDATED", payload });
      return;
    }
    readFileAsDataURL(file, (result) => {
      const payload = { preview: result };
      dispatch({ type: "PREVIEW_UPDATED", payload });
    });
  },
  setTopText(event) {
    const payload = { topText: event.target.value };
    dispatch({ type: "TOP_TEXT_CHANGED", payload });
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
