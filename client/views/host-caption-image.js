import { getState } from "../store.js";
import { div, p } from "../ui.js";
import { Meme } from "./meme.js";

export const HostCaptionImage = () => {
  const { src } = getState();
  return div({ className: "page" }, p("Waiting for captions"), Meme({ src }));
};
