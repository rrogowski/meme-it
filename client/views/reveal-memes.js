import { decideWinner, goToNextCaption, goToPrevCaption } from "../http.js";
import { getCurrentState } from "../state.js";
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
  const { captions, index, src } = getCurrentState();
  const { canVote, hasNextCaption, hasPrevCaption } = getDerivedState();
  return div(
    { className: "page" },
    button({ disabled: !canVote, onclick: decideWinner }, "Start New Round"),
    Meme({ ...captions[index], src }),
    div(
      { className: "button-group" },
      button({ disabled: !hasPrevCaption, onclick: goToPrevCaption }, "Back"),
      button({ disabled: !hasNextCaption, onclick: goToNextCaption }, "Next")
    )
  );
};

const CurrentMeme = () => {
  const { captions, index, src } = getCurrentState();
  return div({ className: "page" }, Meme({ ...captions[index], src }));
};

const getDerivedState = () => {
  const { captions, czar, index, name } = getCurrentState();
  return {
    canVote: captions.every(({ wasViewed }) => wasViewed),
    hasNextCaption: index < captions.length - 1,
    hasPrevCaption: index > 0,
    isCzar: name === czar,
  };
};
