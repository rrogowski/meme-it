import { div } from "../ui.js";
import { WaitingLogo } from "./waiting-logo.js";

export const PlayerRevealMemes = () => {
  return div({ className: "page" }, WaitingLogo());
};
