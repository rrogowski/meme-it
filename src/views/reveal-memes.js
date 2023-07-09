import { startNewRound } from "../api/http.js";
import { button, div } from "../lib/ui.js";
import { Meme } from "./meme.js";

export const RevealMemes = ({ server }) => {
  const { isUploader } = server.state;
  return isUploader ? AllMemes({ server }) : CurrentMeme({ server });
};

const AllMemes = ({ server }) => {
  const { caption, hasNext, hasPrevious, src, unviewedCaptions } = server.state;
  const { getNextCaption, getPreviousCaption } = server.actions;
  return div(
    { className: "reveal-memes" },
    button("Start New Round", {
      disabled: unviewedCaptions.length > 0,
      onclick: startNewRound,
    }),
    div({ className: "preview" }, Meme({ caption, src })),
    div(
      { style: "display: flex;" },
      button("Back", {
        disabled: !hasPrevious,
        onclick: getPreviousCaption,
        style: "flex-grow: 1;",
      }),
      button("Next", {
        disabled: !hasNext,
        onclick: getNextCaption,
        style: "flex-grow: 1;",
      })
    )
  );
};

const CurrentMeme = ({ server }) => {
  const { caption, src } = server.state;
  return div(
    { className: "reveal-memes" },
    div({ className: "preview" }, Meme({ caption, src }))
  );
};
