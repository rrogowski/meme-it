import { actions } from "../actions.js";
import { button, div, input, p } from "../lib/ui.js";
import { state } from "../store.js";
import { Meme } from "./meme.js";

export const SelectImage = () => {
  const { uploader } = state.current;
  const { isUploader } = state.derived;
  if (isUploader) {
    return UploadImage();
  }
  return uploader ? WaitingForUpload() : WaitingForPlayers();
};

const UploadImage = () => {
  const { preview } = state.current;
  const { openFileDialog, setPreview, uploadImage } = actions;
  return div(
    { className: "select-image" },
    input({ accept: "image/*", onchange: setPreview, type: "file" }),
    button({ onclick: openFileDialog }, "Choose File"),
    div({ className: "preview" }, preview ? Meme({ src: preview }) : null),
    button({ disabled: !preview, onclick: uploadImage }, "Upload Image")
  );
};

const WaitingForUpload = () => {
  const { uploader } = state.current;
  return div(
    { className: "select-image" },
    p(`Waiting for ${uploader} to upload image`)
  );
};

const WaitingForPlayers = () => {
  return div(
    { className: "select-image" },
    p(`Waiting for at least one player to join`)
  );
};
