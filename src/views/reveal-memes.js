import { nextCaption, previousCaption } from "../api/http.js";
import { button, div, img, p } from "../lib/ui.js";
import { Meme } from "./meme.js";

export const RevealMemes = ({ client, server }) => {
  const { isHost, name } = client;
  const { captions, index, src, uploader } = server;

  const hasUnviewedMeme = !wasEveryMemeViewed(captions);
  console.log("hasUnviewedMeme?", hasUnviewedMeme);

  const caption = captions[index];

  const goBack = () => {
    previousCaption();
  };

  const next = () => {
    nextCaption();
  };

  return div(
    { className: "reveal-memes" },
    name === uploader
      ? button("Start New Round", { disabled: hasUnviewedMeme })
      : null,
    div(
      { className: "preview" },
      Meme({ src, topText: caption.top, bottomText: caption.bottom })
    ),
    name === uploader
      ? div(
          { style: "display: flex;" },
          button("Back", {
            disabled: index === 0,
            onclick: goBack,
            style: "flex-grow: 1;",
          }),
          button("Next", {
            disabled: index === captions.length - 1,
            onclick: next,
            style: "flex-grow: 1;",
          })
        )
      : null
  );
};

const wasEveryMemeViewed = (captions) => {
  return captions.every(({ wasViewed }) => wasViewed);
};
