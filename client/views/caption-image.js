import { actions } from "../actions.js";
import { getDerivedState } from "../helpers.js";
import { getCurrentState, state } from "../store.js";
import { button, div, input, p } from "../ui.js";
import { Meme } from "./meme.js";

export const CaptionImage = () => {
  const { canCaption, canReveal, isCzar } = getDerivedState();
  if (isCzar) {
    return CaptionCounter();
  } else if (canCaption) {
    return UploadCaption();
  } else if (canReveal) {
    return WaitingForReveal();
  }
  return WaitingForCaptions();
};

const CaptionCounter = () => {
  const { revealMemes } = actions;
  const { captions } = getCurrentState();
  const { canReveal } = getDerivedState();
  return div(
    { className: "page" },
    p(`Received ${captions.length} caption(s)`),
    button({ disabled: !canReveal, onclick: revealMemes }, "Reveal Memes")
  );
};

const UploadCaption = () => {
  const { setBottomText, setTopText, uploadCaption } = actions;
  const { bottomText, src, topText } = getCurrentState();
  const { hasCaption } = getDerivedState();
  return div(
    { className: "page" },
    Meme({ bottomText, src, topText }),
    input({ placeholder: "Top Text", oninput: setTopText }),
    input({ placeholder: "Bottom Text", oninput: setBottomText }),
    button({ disabled: !hasCaption, onclick: uploadCaption }, "Upload Caption")
  );
};

const WaitingForReveal = () => {
  const { czar } = getCurrentState();
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
