import { openFileDialog, readAsDataURL } from "../file.js";
import { uploadImage } from "../http.js";
import { getState } from "../store.js";
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
  return div(
    { className: "page" },
    input({ accept: "image/*", onchange: openFile, type: "file" }),
    button({ onclick: selectImage }, "Select Image"),
    Meme({ src: preview }),
    button({ disabled: !preview, onclick: submitImage }, "Submit Image")
  );
};

const WaitingForUpload = () => {
  const { czar } = getState();
  return div({ className: "page" }, p(`Waiting for ${czar} to upload image`));
};

const WaitingForPlayers = () => {
  return div(
    { className: "page" },
    p(`Waiting for at least one more player to join`)
  );
};

const getDerivedState = () => {
  const { czar, name } = getState();
  return { hasCzar: czar !== null, isCzar: name === czar };
};

const selectImage = () => {
  openFileDialog();
};

const openFile = (event) => {
  const file = event.target.files[0];
  readAsDataURL(file);
};

const submitImage = () => {
  const { preview } = getState();
  uploadImage(preview);
};
