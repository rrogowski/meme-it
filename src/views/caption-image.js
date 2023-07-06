import { postCaption, revealMemes } from "../api/http.js";
import { setClientState } from "../lib/state.js";
import { button, div, input, p } from "../lib/ui.js";
import { Meme } from "./meme.js";

export const CaptionImage = ({ client, server }) => {
  const { bottomText, isHost, name, topText } = client;
  const { captions, names, src, uploader } = server;

  const namesPendingCaption = getNamesPendingCaption(captions, names, uploader);

  if (isHost || name === uploader || hasSubmittedCaption(captions, name)) {
    return div(
      { className: "caption-image" },
      p(`Received ${captions.length} caption(s)`),
      name === uploader
        ? button("Reveal Memes", {
            disabled: namesPendingCaption.length > 0,
            onclick: revealMemes,
          })
        : null,
      name !== uploader
        ? namesPendingCaption.length > 0
          ? div(p("Waiting on:", ...namesPendingCaption.map(p)))
          : div(p(`Waiting on ${uploader} to reveal memes`))
        : null
    );
  }

  const setTopText = (event) => {
    setClientState({ topText: event.target.value });
  };
  const setBottomText = (event) => {
    setClientState({ bottomText: event.target.value });
  };
  const submitCaption = () =>
    postCaption({ author: name, bottomText, topText });
  return div(
    { className: "caption-image" },
    div({ className: "preview" }, Meme({ bottomText, src, topText })),
    input({
      key: "top-text",
      oninput: setTopText,
      placeholder: "Top Text",
      value: topText,
    }),
    input({
      key: "bottom-text",
      oninput: setBottomText,
      placeholder: "Bottom Text",
      value: bottomText,
    }),
    button("Submit", {
      disabled: !bottomText && !topText,
      onclick: submitCaption,
    })
  );
};

const getNamesPendingCaption = (captions, names, uploader) => {
  return names
    .filter((name) => name !== uploader)
    .filter((name) => !captions.find(({ author }) => author === name));
};

const hasSubmittedCaption = (captions, name) => {
  return captions.find(({ author }) => author === name);
};
