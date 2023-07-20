import { div } from "../ui.js";
import { WaitingLogo } from "./waiting-logo.js";

export const PlayerShowWinner = () => {
  return div({ className: "page" }, WaitingLogo());
};
