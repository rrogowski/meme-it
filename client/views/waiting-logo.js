import { div, p } from "../ui.js";

export const WaitingLogo = () => {
  return div({ className: "page" }, div({ className: "logo" }, p("Meme It")));
};
