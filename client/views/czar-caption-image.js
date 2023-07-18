import { revealMemes } from "../http.js";
import { getState } from "../store.js";
import { button, div, p } from "../ui.js";

export const CaptionImage = () => {
  const { captions } = getState();
  const { canReveal } = getDerivedState();
  return div(
    { className: "page" },
    p(`Received ${captions.length} caption(s)`),
    button({ disabled: !canReveal, onclick: revealMemes }, "Reveal Memes")
  );
};

const getDerivedState = () => {
  const { captions, czar, players } = getState();
  const authors = captions.map(({ author }) => author);
  const citizens = players.filter((player) => player !== czar);
  return {
    canReveal: citizens.every((n) => authors.includes(n)) && authors.length > 0,
  };
};
