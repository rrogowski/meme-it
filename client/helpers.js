import { getCurrentState } from "./store.js";

export const getDerivedState = () => {
  const state = { captions: [], names: [], ...getCurrentState() };
  const { bottomText, captions, czar, index, name, names, topText } = state;
  const authors = captions.map(({ author }) => author);
  const citizens = names.filter((n) => n !== czar);
  return {
    canCaption: citizens.includes(name) && !authors.includes(name),
    canDecide: captions.every(({ wasViewed }) => wasViewed),
    canReveal: authors.length > 0 && citizens.every((n) => authors.includes(n)),
    caption: captions[index],
    hasCaption: topText.length > 0 || bottomText.length > 0,
    hasNextCaption: index < captions.length - 1,
    hasPrevCaption: index > 0,
    isCzar: name === czar,
    isHost: name === "",
    pendingAuthors: citizens.filter((n) => !authors.includes(n)),
  };
};
