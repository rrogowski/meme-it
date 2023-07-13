import { actions } from "../actions.js";
import { getCurrentState, state } from "../store.js";
import { button, div, input, p } from "../ui.js";
import { Meme } from "./meme.js";

export const CaptionImage = () => {
  const { canCaption, canReveal, isUploader } = state.derived;
  if (isUploader) {
    return CaptionCounter();
  } else if (canCaption) {
    return EnterCaption();
  } else if (canReveal) {
    return WaitingForReveal();
  }
  return WaitingForCaptions();
};

const CaptionCounter = () => {
  const { revealMemes } = actions;
  const { captions } = getCurrentState();
  const { canReveal } = state.derived;
  return div(
    { className: "caption-image" },
    p(`Received ${captions.length} caption(s)`),
    button({ disabled: !canReveal, onclick: revealMemes }, "Reveal Memes")
  );
};

const EnterCaption = () => {
  const { setBottomText, setTopText, uploadCaption } = actions;
  const { bottomText, src, topText } = getCurrentState();
  const { isCaptionInvalid } = state.derived;
  return div(
    { className: "caption-image" },
    div({ className: "preview" }, Meme({ bottomText, src, topText })),
    input({ placeholder: "Top Text", oninput: setTopText }),
    input({ placeholder: "Bottom Text", oninput: setBottomText }),
    button({ disabled: isCaptionInvalid, onclick: uploadCaption }, "Upload")
  );
};

const WaitingForReveal = () => {
  const { uploader } = getCurrentState();
  return div(
    { className: "caption-image" },
    p(`Waiting for ${uploader} to reveal memes`)
  );
};

const WaitingForCaptions = () => {
  const { pendingAuthors } = state.derived;
  return div(
    { className: "caption-image" },
    p("Waiting for captions from:"),
    ...pendingAuthors.map(p)
  );
};