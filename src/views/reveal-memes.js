import { nextCaption, previousCaption, startNewRound } from "../api/http.js";
import { button, div } from "../lib/ui.js";
import { Meme } from "./meme.js";

export const RevealMemes = ({ client, server }) => {
  const { name } = client;
  const { captions, index, src, uploader } = server;

  const hasUnviewedMeme = !wasEveryMemeViewed(captions);

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
      ? button("Start New Round", {
          disabled: hasUnviewedMeme,
          onclick: startNewRound,
        })
      : null,
    div({ className: "preview" }, Meme({ src, ...caption })),
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
