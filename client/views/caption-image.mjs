import { button, div, input, p } from "../lib/ui.mjs";
import { Meme } from "./meme.mjs";

export const CaptionImage = ({ actions, state }) => {
  const View = getView(state);
  return View({ actions, state });
};

const CaptionCounter = ({ actions, state }) => {
  const { revealMemes } = actions;
  const { canReveal, captions } = state;
  return div(
    { className: "caption-image" },
    p(`Received ${captions.length} caption(s)`),
    button({ disabled: !canReveal, onclick: revealMemes }, "Reveal Memes")
  );
};

const EnterCaption = ({ actions, state }) => {
  const { setBottomText, setTopText, uploadCaption } = actions;
  const { bottomText, isCaptionInvalid, src, topText } = state;
  return div(
    { className: "caption-image" },
    div({ className: "preview" }, Meme({ bottomText, src, topText })),
    input({ placeholder: "Top Text", value: topText, oninput: setTopText }),
    input({
      placeholder: "Bottom Text",
      value: bottomText,
      oninput: setBottomText,
    }),
    button({ disabled: isCaptionInvalid, onclick: uploadCaption }, "Upload")
  );
};

const WaitingForReveal = ({ state }) => {
  const { uploader } = state;
  return div(
    { className: "caption-image" },
    p(`Waiting for ${uploader} to reveal memes`)
  );
};

const WaitingForCaptions = ({ state }) => {
  const { pendingAuthors } = state;
  return div(
    { className: "caption-image" },
    p("Waiting for captions from:"),
    ...pendingAuthors.map(p)
  );
};

const getView = (state) => {
  const { canCaption, canReveal, isUploader } = state;
  if (isUploader) {
    return CaptionCounter;
  } else if (canCaption) {
    return EnterCaption;
  } else if (canReveal) {
    return WaitingForReveal;
  }
  return WaitingForCaptions;
};
