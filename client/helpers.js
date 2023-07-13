import { getCurrentState } from "./store.js";

export const getDerivedState = () => {
  const state = getCurrentState();
  const { bottomText, captions = [], czar, name, names = [], topText } = state;
  const authors = captions.map(({ author }) => author);
  const citizens = names.filter((n) => n !== czar);
  return {
    canCaption: citizens.includes(name) && !authors.includes(name),
    canReveal: authors.length > 0 && citizens.every((n) => authors.includes(n)),
    hasCaption: topText.length > 0 || bottomText.length > 0,
    isCzar: name === czar,
    isHost: name === "",
    pendingAuthors: citizens.filter((n) => !authors.includes(n)),
  };
};
