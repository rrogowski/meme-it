import { readFileAsDataURL } from "../api/file.js";
import { uploadImage } from "../api/http.js";
import { setClientState } from "../lib/state.js";
import { button, div, img, input, p } from "../lib/ui.js";
import { Meme } from "./meme.js";

export const SelectImage = ({ client, server }) => {
  const { caption, file, isHost, name, preview } = client;
  const { uploader } = server;

  const topText = caption.top;
  const bottomText = caption.bottom;

  if (isHost || name !== uploader) {
    return `Waiting for ${uploader} to upload an image`;
  }

  const submitImage = () => uploadImage(file);
  // return div(
  //   { className: "select-image" },
  //   input({ accept: "image/*", key: "file", onchange: setFile, type: "file" }),
  //   div(
  //     { className: "preview" },
  //     preview ? Meme({ src: preview, topText, bottomText }) : null
  //   ),
  //   button("Submit Image", { disabled: !preview, onclick: submitImage })
  // );

  return div(
    {
      style: "background-color: red; width: 500px; height: 500px;",
    },
    img({
      style: "max-width: 100%; max-height: 100%",
      src: preview,
    })
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
