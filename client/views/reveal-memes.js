import { button, div } from "../lib/ui.js";
import { Meme } from "./meme.js";

export const RevealMemes = ({ client, server }) => {
  const { isUploader } = server.state;
  return isUploader ? AllMemes({ client, server }) : CurrentMeme({ server });
};

const AllMemes = ({ client, server }) => {
  const { preview } = client.state;
  const { caption, hasNext, hasPrevious, canDecideWinner } = server.state;
  const { decideWinner, getNextCaption, getPreviousCaption } = server.actions;
  return div(
    { className: "reveal-memes" },
    button({ disabled: !canDecideWinner, onclick: decideWinner }, "Winner"),
    Meme({ caption, src: preview }),
    div(
      { className: "navigation-controls" },
      button({ disabled: !hasPrevious, onclick: getPreviousCaption }, "Back"),
      button({ disabled: !hasNext, onclick: getNextCaption }, "Next")
    )
  );
};

const CurrentMeme = ({ server }) => {
  const { caption, src } = server.state;
  return div({ className: "reveal-memes" }, Meme({ caption, src }));
};
