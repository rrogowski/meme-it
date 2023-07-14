import { decideWinner, setIndex } from "../http.js";
import { getState } from "../store.js";
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
  const { captions, index, src } = getState();
  const { canDecide, hasNextCaption, hasPrevCaption } = getDerivedState();
  return div(
    { className: "page" },
    button({ disabled: !canDecide, onclick: decideWinner }, "Start New Round"),
    Meme({ ...captions[index], src }),
    div(
      { className: "button-group" },
      button({ disabled: !hasPrevCaption, onclick: goToPrevCaption }, "Back"),
      button({ disabled: !hasNextCaption, onclick: goToNextCaption }, "Next")
    )
  );
};

const CurrentMeme = () => {
  const { captions, index, src } = getState();
  return div({ className: "page" }, Meme({ ...captions[index], src }));
};

const getDerivedState = () => {
  const { captions, czar, index, name, revealed } = getState();
  return {
    canDecide: revealed === captions.length,
    hasNextCaption: index < captions.length - 1,
    hasPrevCaption: index > 0,
    isCzar: name === czar,
  };
};

const goToNextCaption = () => {
  const { index } = getState();
  setIndex(index + 1);
};

const goToPrevCaption = () => {
  const { index } = getState();
  setIndex(index - 1);
};
