import { button, div } from "../lib/ui.mjs";
import { Meme } from "./meme.mjs";

export const RevealMemes = ({ actions, state }) => {
  const View = getView(state);
  return View({ actions, state });
};

const AllMemes = ({ actions, state }) => {
  const { decideWinner, goToNextCaption, goToPrevCaption } = actions;
  const { canDecide, caption, hasNextCaption, hasPrevCaption, preview } = state;
  return div(
    { className: "reveal-memes" },
    button({ disabled: !canDecide, onclick: decideWinner }, "Start New Round"),
    Meme({ ...caption, src: preview }),
    div(
      { className: "navigation-controls" },
      button({ disabled: !hasPrevCaption, onclick: goToPrevCaption }, "Back"),
      button({ disabled: !hasNextCaption, onclick: goToNextCaption }, "Next")
    )
  );
};

const CurrentMeme = ({ state }) => {
  const { caption, src } = state;
  return div({ className: "reveal-memes" }, Meme({ ...caption, src }));
};

const getView = (state) => {
  const { isUploader } = state;
  return isUploader ? AllMemes : CurrentMeme;
};
