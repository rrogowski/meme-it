import { readFileAsDataURL } from "../api/file.js";
import { uploadImage } from "../api/http.js";
import { setClientState } from "../lib/state.js";
import { button, div, img, input } from "../lib/ui.js";

export const SelectImage = ({ client, server }) => {
  const { file, isHost, name, preview } = client;
  const { uploader } = server;

  if (isHost || name !== uploader) {
    return `Waiting for ${uploader} to upload an image`;
  }

  const submitImage = () => uploadImage(file);
  return div(
    input({ accept: "image/*", key: "file", onchange: setFile, type: "file" }),
    preview ? img({ src: preview }) : null,
    button("Submit Image", { disabled: !preview, onclick: submitImage })
  );
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
