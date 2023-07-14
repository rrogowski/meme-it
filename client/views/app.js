import { getState } from "../store.js";
import { CaptionImage } from "./caption-image.js";
import { MainMenu } from "./main-menu.js";
import { RevealMemes } from "./reveal-memes.js";
import { SelectImage } from "./select-image.js";

export const App = () => {
  const { phase } = getState();
  switch (phase) {
    case "SELECT_IMAGE":
      return SelectImage();
    case "CAPTION_IMAGE":
      return CaptionImage();
    case "REVEAL_MEMES":
      return RevealMemes();
    default:
      return MainMenu();
  }
};
