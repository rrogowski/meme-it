import { revealMemes, uploadCaption } from "../http.js";
import { dispatch, getState } from "../store.js";
import { button, div, input, p } from "../ui.js";
import { Meme } from "./meme.js";

export const CaptionImage = () => {
  const { canCaption, canReveal, hasCitizens, isCzar } = getDerivedState();
  if (isCzar) {
    return CaptionCounter();
  } else if (canCaption) {
    return UploadCaption();
  } else if (canReveal) {
    return WaitingForReveal();
  } else if (hasCitizens) {
    return WaitingForCaptions();
  } else {
    return WaitingForCitizens();
  }
};

const CaptionCounter = () => {
  const { captions } = getState();
  const { canReveal } = getDerivedState();
  return div(
    { className: "page" },
    p(`Received ${captions.length} caption(s)`),
    button({ disabled: !canReveal, onclick: revealMemes }, "Reveal Memes")
  );
};

const UploadCaption = () => {
  const { bottomText, src, topText } = getState();
  const { hasCaption } = getDerivedState();
  return div(
    { className: "page" },
    Meme({ bottomText, src, topText }),
    input({ placeholder: "Top Text", oninput: setTopText }),
    input({ placeholder: "Bottom Text", oninput: setBottomText }),
    button({ disabled: !hasCaption, onclick: submitCaption }, "Submit Caption")
  );
};

const WaitingForReveal = () => {
  const { czar } = getState();
  return div({ className: "page" }, p(`Waiting for ${czar} to reveal memes`));
};

const WaitingForCaptions = () => {
  const { pendingAuthors } = getDerivedState();
  return div(
    { className: "page" },
    p("Waiting for captions from:"),
    ...pendingAuthors.map(p)
  );
};

const WaitingForCitizens = () => {
  return div(
    { className: "page" },
    p(`Waiting for at least one citizen to join`)
  );
};

const getDerivedState = () => {
  const { bottomText, captions, czar, name, players, topText } = getState();
  const authors = captions.map(({ author }) => author);
  const citizens = players.filter((player) => player !== czar);
  return {
    canCaption: citizens.includes(name) && !authors.includes(name),
    canReveal: citizens.every((n) => authors.includes(n)) && authors.length > 0,
    hasCaption: topText.length > 0 || bottomText.length > 0,
    hasCitizens: citizens.length > 0,
    isCzar: name === czar,
    pendingAuthors: citizens.filter((n) => !authors.includes(n)),
  };
};

const setBottomText = (event) => {
  dispatch({ type: "SET_BOTTOM_TEXT", payload: event.target.value });
};

const setTopText = (event) => {
  dispatch({ type: "SET_TOP_TEXT", payload: event.target.value });
};

const submitCaption = () => {
  const { bottomText, name, topText } = getState();
  uploadCaption({ author: name, bottomText, topText });
};
