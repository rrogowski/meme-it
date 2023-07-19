import { div } from "../ui.js";
import { WaitingLogo } from "./waiting-logo.js";

export const PlayerSelectImage = () => {
  return div({ className: "page" }, WaitingLogo());
};
