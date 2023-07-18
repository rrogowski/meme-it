import { decideWinner, setIndex } from "../http.js";
import { getState } from "../store.js";
import { button, div } from "../ui.js";
import { Meme } from "./meme.js";

export const RevealMemes = () => {
  const { captions, index, src } = getState();
  const { canDecide, hasNext, hasPrev } = getDerivedState();
  return div(
    { className: "page" },
    button({ disabled: !canDecide, onclick: decideWinner }, "Start New Round"),
    Meme({ ...captions[index], src }),
    div(
      { className: "button-group" },
      button({ disabled: !hasPrev, onclick: goToPrev }, "Back"),
      button({ disabled: !hasNext, onclick: goToNext }, "Next")
    )
  );
};

const getDerivedState = () => {
  const { captions, index, revealed } = getState();
  return {
    canDecide: revealed === captions.length,
    hasNext: index < captions.length - 1,
    hasPrev: index > 0,
  };
};

const goToNext = () => {
  const { index } = getState();
  setIndex(index + 1);
};

const goToPrev = () => {
  const { index } = getState();
  setIndex(index - 1);
};
