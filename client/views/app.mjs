import { CaptionImage } from "./caption-image.mjs";
import { MainMenu } from "./main-menu.mjs";
import { RevealMemes } from "./reveal-memes.mjs";
import { SelectImage } from "./select-image.mjs";

export const App = ({ actions, state }) => {
  console.log(state);
  const View = getView(state);
  return View({ actions, state });
};

const getView = (state) => {
  const { phase } = state;
  switch (phase) {
    case "SELECT_IMAGE":
      return SelectImage;
    case "CAPTION_IMAGE":
      return CaptionImage;
    case "REVEAL_MEMES":
      return RevealMemes;
    default:
      return MainMenu;
  }
};
