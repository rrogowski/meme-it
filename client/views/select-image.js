import { actions } from "../actions.js";
import { getDerivedState } from "../helpers.js";
import { getCurrentState } from "../store.js";
import { button, div, input, p } from "../ui.js";
import { Meme } from "./meme.js";

export const SelectImage = () => {
  const { hasUploader, isUploader } = getDerivedState();
  if (isUploader) {
    return UploadImage();
  } else if (hasUploader) {
    return WaitingForUpload();
  } else {
    return WaitingForPlayers();
  }
};

const UploadImage = () => {
  const { preview } = getCurrentState();
  const { openFileDialog, setPreview, uploadImage } = actions;
  return div(
    { className: "page" },
    input({ accept: "image/*", onchange: setPreview, type: "file" }),
    button({ onclick: openFileDialog }, "Choose File"),
    Meme({ src: preview }),
    button({ disabled: !preview, onclick: uploadImage }, "Upload Image")
  );
};

const WaitingForUpload = () => {
  const { uploader } = getCurrentState();
  return div(
    { className: "page" },
    p(`Waiting for ${uploader} to upload image`)
  );
};

const WaitingForPlayers = () => {
  return div(
    { className: "page" },
    p(`Waiting for at least one player to join`)
  );
};
