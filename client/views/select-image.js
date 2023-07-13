import { actions } from "../actions.js";
import { getDerivedState } from "../helpers.js";
import { getCurrentState } from "../state.js";
import { button, div, input, p } from "../ui.js";
import { Meme } from "./meme.js";

export const SelectImage = () => {
  const { czar } = getCurrentState();
  const { isCzar } = getDerivedState();
  if (isCzar) {
    return UploadImage();
  } else if (czar) {
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
  const { czar } = getCurrentState();
  return div({ className: "page" }, p(`Waiting for ${czar} to upload image`));
};

const WaitingForPlayers = () => {
  return div(
    { className: "page" },
    p(`Waiting for at least one player to join`)
  );
};
