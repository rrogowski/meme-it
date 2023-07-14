import { post } from "../http.js";
import { getState, setState } from "../state.js";
import { button, div, input, p } from "../ui.js";
import { Meme } from "./meme.js";

export const SelectImage = () => {
  const { hasCzar, isCzar } = getDerivedState();
  if (isCzar) {
    return UploadImage();
  } else if (hasCzar) {
    return WaitingForUpload();
  } else {
    return WaitingForPlayers();
  }
};

const UploadImage = () => {
  const { preview } = getState();
  const { openFileDialog, setPreview, uploadImage } = getActions();
  return div(
    { className: "page" },
    input({ accept: "image/*", onchange: setPreview, type: "file" }),
    button({ onclick: openFileDialog }, "Choose File"),
    Meme({ src: preview }),
    button({ disabled: !preview, onclick: uploadImage }, "Upload Image")
  );
};

const WaitingForUpload = () => {
  const { czar } = getState();
  return div({ className: "page" }, p(`Waiting for ${czar} to upload image`));
};

const WaitingForPlayers = () => {
  return div(
    { className: "page" },
    p(`Waiting for at least one player to join`)
  );
};

const getActions = () => {
  const openFileDialog = () => {
    const fileInput = document.querySelector("input[type=file]");
    const event = new window.MouseEvent("click");
    fileInput.dispatchEvent(event);
  };

  const setPreview = (event) => {
    const file = event.target.files[0];
    if (!file) {
      setState({ preview: "" });
      return;
    }
    const reader = new window.FileReader();
    reader.addEventListener("load", () => setState({ preview: reader.result }));
    reader.readAsDataURL(file);
  };

  const uploadImage = () => {
    const { preview } = getState();
    fetch(preview)
      .then((response) => response.arrayBuffer())
      .then((buffer) => post("/upload", buffer))
      .then(() => setState({ preview: "" }));
  };

  return { openFileDialog, setPreview, uploadImage };
};

const getDerivedState = () => {
  const { czar, name } = getState();
  return { hasCzar: czar !== "", isCzar: name === czar };
};
