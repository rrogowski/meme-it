import { button, div, input, p } from "../lib/ui.js";
import { Meme } from "./meme.js";

export const SelectImage = ({ client, server }) => {
  const { isUploader } = server.state;
  return isUploader
    ? UploadImage({ client, server })
    : WaitingForUpload({ server });
};

const UploadImage = ({ client, server }) => {
  const { openFileDialog, setPreview } = client.actions;
  const { preview } = client.state;
  const { uploadImage } = server.actions;
  return div(
    { className: "select-image" },
    input({ accept: "image/*", onchange: setPreview, type: "file" }),
    button({ onclick: openFileDialog }, "Choose File"),
    div({ className: "preview" }, preview ? Meme({ src: preview }) : null),
    button({ disabled: !preview, onclick: uploadImage }, "Upload Image")
  );
};

const WaitingForUpload = ({ server }) => {
  const { uploader } = server.state;
  return div(
    { className: "select-image" },
    p(`"Waiting for ${uploader} to upload image`)
  );
};
