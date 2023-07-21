import { getCurrentState } from "../store.js";
import { CzarCaptionImage } from "./czar-caption-image.js";
import { CzarRevealMemes } from "./czar-reveal-memes.js";
import { CzarSelectImage } from "./czar-select-image.js";
import { CzarShowWinner } from "./czar-show-winner.js";
import { HostCaptionImage } from "./host-caption-image.js";
import { HostRevealMemes } from "./host-reveal-memes.js";
import { HostSelectImage } from "./host-select-image.js";
import { HostShowWinner } from "./host-show-winner.js";
import { MainMenu } from "./main-menu.js";
import { PlayerCaptionImage } from "./player-caption-image.js";
import { PlayerRevealMemes } from "./player-reveal-memes.js";
import { PlayerSelectImage } from "./player-select-image.js";
import { PlayerShowWinner } from "./player-show-winner.js";

export const App = () => {
  const { phase } = getCurrentState();
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
    case "SHOW_WINNER":
      return isHost
        ? HostShowWinner()
        : isCzar
        ? CzarShowWinner()
        : PlayerShowWinner();
    default:
      return MainMenu();
  }
};

const getDerivedState = () => {
  const { czar, name } = getCurrentState();
  return { isCzar: name === czar, isHost: name === "" };
};
