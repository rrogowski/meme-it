import { button, div, input, p } from "../lib/ui.mjs";
import { Meme } from "./meme.mjs";

export const SelectImage = ({ actions, state }) => {
  const View = getView(state);
  return View({ actions, state });
};

const UploadImage = ({ actions, state }) => {
  const { setPreview, uploadImage } = actions;
  const { preview } = state;
  return div(
    { className: "select-image" },
    input({ accept: "image/*", onchange: setPreview, type: "file" }),
    button({ onclick: openFileDialog }, "Choose File"),
    div({ className: "preview" }, preview ? Meme({ src: preview }) : null),
    button({ disabled: !preview, onclick: uploadImage }, "Upload Image")
  );
};

const WaitingForUpload = ({ state }) => {
  const { uploader } = state;
  return div(
    { className: "select-image" },
    p(`Waiting for ${uploader} to upload image`)
  );
};

const getView = (state) => {
  const { isUploader } = state;
  return isUploader ? UploadImage : WaitingForUpload;
};

const openFileDialog = () => {
  const fileInput = document.querySelector("input[type=file]");
  const event = new MouseEvent("click");
  fileInput.dispatchEvent(event);
};
