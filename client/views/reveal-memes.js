import { post } from "../http.js";
import { getState } from "../state.js";
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
  const { canVote, hasNextCaption, hasPrevCaption } = getDerivedState();
  const { decideWinner, goToNextCaption, goToPrevCaption } = getActions();
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
  const { captions, index, src } = getState();
  return div({ className: "page" }, Meme({ ...captions[index], src }));
};

const getDerivedState = () => {
  const { captions, czar, index, name } = getState();
  return {
    canVote: captions.every(({ wasViewed }) => wasViewed),
    hasNextCaption: index < captions.length - 1,
    hasPrevCaption: index > 0,
    isCzar: name === czar,
  };
};

const getActions = () => {
  const decideWinner = () => {
    post("/winner");
  };

  const goToNextCaption = () => {
    post("/next");
  };

  const goToPrevCaption = () => {
    post("/prev");
  };

  return { decideWinner, goToNextCaption, goToPrevCaption };
};
