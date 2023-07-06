import { readFileAsDataURL } from "../api/file.js";
import { uploadImage } from "../api/http.js";
import { setClientState } from "../lib/state.js";
import { button, div, img, input, p } from "../lib/ui.js";
import { Meme } from "./meme.js";

export const SelectImage = ({ client, server }) => {
  const { file, isHost, name, preview } = client;
  const { uploader } = server;

  if (isHost || name !== uploader) {
    return div(
      { className: "select-image" },
      p("Waiting on upload from:"),
      p(uploader)
    );
  }

  const { fileInput, openFileDialog } = createFileInput();

  const submitImage = () => uploadImage(file);
  return div(
    { className: "select-image" },
    fileInput,
    button("Choose File", { onclick: openFileDialog }),
    div({ className: "preview" }, preview ? Meme({ src: preview }) : null),
    button("Upload Image", { disabled: !preview, onclick: submitImage })
  );
};

const createFileInput = () => {
  const fileInput = input({
    accept: "image/*",
    key: "file",
    onchange: setFile,
    type: "file",
  });

  const openFileDialog = () => {
    const event = new MouseEvent("click");
    fileInput.dispatchEvent(event);
  };

  return { fileInput, openFileDialog };
};

const setFile = (event) => {
  const file = event.target.files[0];
  if (!file) {
    setClientState({ file: null, preview: null });
    return;
  }
  readFileAsDataURL(file, (result) => {
    setClientState({ file, preview: result });
  });
};
