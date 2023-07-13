import { getCurrentState } from "./store.js";

export const getDerivedState = () => {
  const { captions = [], czar, name, names = [] } = getCurrentState();
  const authors = captions.map(({ author }) => author);
  const citizens = names.filter((n) => n !== czar);
  return {
    canCaption: citizens.includes(name) && !authors.includes(name),
    canReveal: authors.length > 0 && citizens.every((n) => authors.includes(n)),
    isCzar: name === czar,
    isHost: name === "",
  };
};
