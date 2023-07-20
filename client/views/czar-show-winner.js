import { startNewRound } from "../http.js";
import { button, div } from "../ui.js";

export const CzarShowWinner = () => {
  return div(
    { className: "page" },
    button({ onclick: startNewRound }, "Start New Round")
  );
};
