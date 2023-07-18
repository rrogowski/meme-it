import { openFileDialog, readAsDataURL } from "../file.js";
import { uploadImage } from "../http.js";
import { getState } from "../store.js";
import { button, div, input } from "../ui.js";
import { Meme } from "./meme.js";

export const CzarSelectImage = () => {
  const { preview } = getState();
  return div(
    { className: "page" },
    input({ accept: "image/*", onchange: openFile, type: "file" }),
    button({ onclick: selectImage }, "Select Image"),
    Meme({ src: preview }),
    button({ disabled: !preview, onclick: submitImage }, "Submit Image")
  );
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
