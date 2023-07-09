import { CaptionImage } from "./caption-image.js";
import { MainMenu } from "./main-menu.js";
import { RevealMemes } from "./reveal-memes.js";
import { SelectImage } from "./select-image.js";

export const App = ({ client, server }) => {
  const { phase } = server.state;
  const View = getView(phase);
  return View({ client, server });
};

const getView = (phase) => {
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
