import { getState } from "../store.js";
import { div } from "../ui.js";
import { Meme } from "./meme.js";

export const RevealMemes = () => {
  const { captions, index, src } = getState();
  return div({ className: "page" }, Meme({ ...captions[index], src }));
};
