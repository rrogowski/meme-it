import { button, div, input, p } from "../lib/ui.js";
import { Meme } from "./meme.js";

export const SelectImage = ({ client, server }) => {
  const { isUploader } = client.state;
  return isUploader ? ChooseFile({ client }) : WaitingFor({ server });
};

const ChooseFile = ({ client }) => {
  const { openFileDialog, setPreview, submitImage } = client.actions;
  const { preview } = client.state;
  return div(
    { className: "select-image" },
    input({ accept: "image/*", onchange: setPreview, type: "file" }),
    button("Choose File", { onclick: openFileDialog }),
    div({ className: "preview" }, preview ? Meme({ src: preview }) : null),
    button("Upload Image", { disabled: !preview, onclick: submitImage })
  );
};

const WaitingFor = ({ server }) => {
  const { uploader } = server.state;
  return div(
    { className: "select-image" },
    p("Waiting on upload from:"),
    p(uploader)
  );
};
