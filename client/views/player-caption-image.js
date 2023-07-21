import { uploadCaption } from "../http.js";
import { dispatch, getCurrentState } from "../store.js";
import { button, div, input } from "../ui.js";
import { Meme } from "./meme.js";
import { WaitingLogo } from "./waiting-logo.js";

export const PlayerCaptionImage = () => {
  const { didSubmitCaption } = getDerivedState();
  if (didSubmitCaption) {
    return div({ className: "page" }, WaitingLogo());
  }

  const { bottomText, src, topText } = getCurrentState();
  const { isValid } = getDerivedState();
  return div(
    { className: "page" },
    Meme({ bottomText, src, topText }),
    input({ placeholder: "Top Text", oninput: setTopText }),
    input({ placeholder: "Bottom Text", oninput: setBottomText }),
    button({ disabled: !isValid, onclick: submitCaption }, "Submit Caption")
  );
};

const getDerivedState = () => {
  const { bottomText, captions, name, topText } = getCurrentState();
  const authors = captions.map(({ author }) => author);
  return {
    didSubmitCaption: authors.includes(name),
    isValid: topText.length > 0 || bottomText.length > 0,
  };
};

const setBottomText = (event) => {
  dispatch({ type: "SET_BOTTOM_TEXT", payload: event.target.value });
};

const setTopText = (event) => {
  dispatch({ type: "SET_TOP_TEXT", payload: event.target.value });
};

const submitCaption = () => {
  const { bottomText, name, topText } = getCurrentState();
  uploadCaption({ author: name, bottomText, topText });
};
