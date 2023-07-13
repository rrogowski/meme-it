import { actions } from "../actions.js";
import { getCurrentState, state } from "../store.js";
import { button, div, input, p } from "../ui.js";
import { Meme } from "./meme.js";

export const SelectImage = () => {
  const { uploader } = getCurrentState();
  const { isUploader } = state.derived;
  if (isUploader) {
    return UploadImage();
  }
  return uploader ? WaitingForUpload() : WaitingForPlayers();
};

const UploadImage = () => {
  const { preview } = getCurrentState();
  const { openFileDialog, setPreview, uploadImage } = actions;
  return div(
    { className: "select-image page" },
    input({ accept: "image/*", onchange: setPreview, type: "file" }),
    button({ onclick: openFileDialog }, "Choose File"),
    div({ className: "preview" }, preview ? Meme({ src: preview }) : null),
    button({ disabled: !preview, onclick: uploadImage }, "Upload Image")
  );
};

const WaitingForUpload = () => {
  const { uploader } = getCurrentState();
  return div(
    { className: "select-image page" },
    p(`Waiting for ${uploader} to upload image`)
  );
};

const WaitingForPlayers = () => {
  return div(
    { className: "select-image page" },
    p(`Waiting for at least one player to join`)
  );
};
