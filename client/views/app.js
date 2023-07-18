import { getState } from "../store.js";
import { CzarCaptionImage } from "./czar-caption-image.js";
import { CzarRevealMemes } from "./czar-reveal-memes.js";
import { CzarSelectImage } from "./czar-select-image.js";
import { HostCaptionImage } from "./host-caption-image.js";
import { HostRevealMemes } from "./host-reveal-memes.js";
import { HostSelectImage } from "./host-select-image.js";
import { MainMenu } from "./main-menu.js";
import { PlayerCaptionImage } from "./player-caption-image.js";
import { PlayerRevealMemes } from "./player-reveal-memes.js";
import { PlayerSelectImage } from "./player-select-image.js";

export const App = () => {
  const { phase } = getState();
  const { isCzar, isHost } = getDerivedState();
  switch (phase) {
    case "SELECT_IMAGE":
      return isHost
        ? HostSelectImage()
        : isCzar
        ? CzarSelectImage()
        : PlayerSelectImage();
    case "CAPTION_IMAGE":
      return isHost
        ? HostCaptionImage()
        : isCzar
        ? CzarCaptionImage()
        : PlayerCaptionImage();
    case "REVEAL_MEMES":
      return isHost
        ? HostRevealMemes()
        : isCzar
        ? CzarRevealMemes()
        : PlayerRevealMemes();
    default:
      return MainMenu();
  }
};

const getDerivedState = () => {
  const { czar, name } = getState();
  return { isCzar: name === czar, isHost: name === "" };
};
