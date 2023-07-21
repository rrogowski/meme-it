import { getCurrentState } from "../store.js";
import { div, p } from "../ui.js";
import { Meme } from "./meme.js";

export const HostShowWinner = () => {
  const { src } = getCurrentState();
  const { caption } = getDerivedState();
  return div(
    { className: "page" },
    p("Waiting for new round..."),
    Meme({ ...caption, src }),
    p(`${caption.author} wins!`)
  );
};

const getDerivedState = () => {
  const { captions, winner } = getCurrentState();
  return { caption: captions.find((c) => c.author === winner) };
};
