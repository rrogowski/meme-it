import { readFileAsDataURL } from "../api/file.js";
import { IMAGE_SRC_URL, postCaption } from "../api/http.js";
import { setClientState } from "../lib/state.js";
import { button, div, img, input, p } from "../lib/ui.js";
import { Meme } from "./meme.js";

export const CaptionImage = ({ client, server }) => {
  const { caption, isHost, name } = client;
  const { captions, names, src, uploader } = server;

  if (isHost || name === uploader || hasSubmittedCaption(captions, name)) {
    const namesPendingCaption = names.filter((n) => n !== uploader);

    return div(p(`Waiting on caption from:`), ...namesPendingCaption.map(p));
  }

  const setTopText = (event) => {
    setClientState({ caption: { ...caption, top: event.target.value } });
  };
  const setBottomText = (event) => {
    setClientState({ caption: { ...caption, bottom: event.target.value } });
  };
  const submitCaption = () => postCaption({ ...caption, author: name });
  return div(
    { className: "caption-image" },
    div(
      { className: "preview" },
      Meme({ src, topText: caption.top, bottomText: caption.bottom })
    ),
    input({
      key: "top-text",
      oninput: setTopText,
      placeholder: "Top Text",
      value: caption.top ?? null,
    }),
    input({
      key: "bottom-text",
      oninput: setBottomText,
      placeholder: "Bottom Text",
      value: caption.bottom ?? null,
    }),
    button("Submit", { onclick: submitCaption })
  );
};

const hasSubmittedCaption = (captions, name) => {
  return captions.find(({ author }) => author === name);
};
