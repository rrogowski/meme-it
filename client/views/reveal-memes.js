import { actions } from "../actions.js";
import { getDerivedState } from "../helpers.js";
import { getCurrentState, state } from "../store.js";
import { button, div } from "../ui.js";
import { Meme } from "./meme.js";

export const RevealMemes = () => {
  const { isCzar } = getDerivedState();
  if (isCzar) {
    return AllMemes();
  } else {
    return CurrentMeme();
  }
};

const AllMemes = () => {
  const { src } = getCurrentState();
  const { canDecide, caption, hasNextCaption, hasPrevCaption } = state.derived;
  const { decideWinner, goToNextCaption, goToPrevCaption } = actions;
  return div(
    { className: "page" },
    button({ disabled: !canDecide, onclick: decideWinner }, "Start New Round"),
    Meme({ ...caption, src }),
    div(
      { className: "button-group" },
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
