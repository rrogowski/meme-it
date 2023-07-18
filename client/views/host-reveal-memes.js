import { getState } from "../store.js";
import { div } from "../ui.js";
import { Meme } from "./meme.js";

export const HostRevealMemes = () => {
  const { captions, src } = getState();
  return div(
    { className: "page" },
    div(
      { className: "gallery" },
      ...captions.map((caption) => Meme({ ...caption, src }))
    )
  );
};
