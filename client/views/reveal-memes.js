import { actions } from "../actions.js";
import { getCurrentState, state } from "../store.js";
import { button, div } from "../ui.js";
import { Meme } from "./meme.js";

export const RevealMemes = () => {
  const { isUploader } = state.derived;
  return isUploader ? AllMemes() : CurrentMeme();
};

const AllMemes = () => {
  const { src } = getCurrentState();
  const { canDecide, caption, hasNextCaption, hasPrevCaption } = state.derived;
  const { decideWinner, goToNextCaption, goToPrevCaption } = actions;
  return div(
    { className: "reveal-memes page" },
    button({ disabled: !canDecide, onclick: decideWinner }, "Start New Round"),
    Meme({ ...caption, src }),
    div(
      { className: "navigation-controls" },
      button({ disabled: !hasPrevCaption, onclick: goToPrevCaption }, "Back"),
      button({ disabled: !hasNextCaption, onclick: goToNextCaption }, "Next")
    )
  );
};

const CurrentMeme = () => {
  const { src } = getCurrentState();
  const { caption } = state.derived;
  return div({ className: "page" }, Meme({ ...caption, src }));
};
