import { getCurrentState } from "../store.js";
import { div, p } from "../ui.js";
import { Meme } from "./meme.js";

export const HostRevealMemes = () => {
  const { captions, src } = getCurrentState();
  return div(
    { className: "page" },
    p("Waiting for decision..."),
    div(
      { className: "gallery" },
      ...captions.map((caption) => Meme({ ...caption, src }))
    )
  );
};
