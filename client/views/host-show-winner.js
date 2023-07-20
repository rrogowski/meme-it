import { getState } from "../store.js";
import { div, p } from "../ui.js";
import { Meme } from "./meme.js";

export const HostShowWinner = () => {
  const { src } = getState();
  const { caption } = getDerivedState();
  return div(
    { className: "page" },
    p("Waiting for new round..."),
    Meme({ ...caption, src }),
    p(`${caption.author} wins!`)
  );
};

const getDerivedState = () => {
  const { captions, winner } = getState();
  return { caption: captions.find((c) => c.author === winner) };
};
