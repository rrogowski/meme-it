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
    button("Choose File", { onclick: openFileDialog }),
    div({ className: "preview" }, preview ? Meme({ src: preview }) : null),
    button("Upload Image", { disabled: !preview, onclick: uploadImage })
  );
};

const WaitingForUpload = ({ server }) => {
  const { uploader } = server.state;
  return div(
    { className: "select-image" },
    p("Waiting on upload from:"),
    p(uploader)
  );
};
