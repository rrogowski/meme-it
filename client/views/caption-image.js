import { post } from "../http.js";
import { getState, setState } from "../state.js";
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
  const { captions } = getState();
  const { canReveal } = getDerivedState();
  const { revealMemes } = getActions();
  return div(
    { className: "page" },
    p(`Received ${captions.length} caption(s)`),
    button({ disabled: !canReveal, onclick: revealMemes }, "Reveal Memes")
  );
};

const UploadCaption = () => {
  const { bottomText, src, topText } = getState();
  const { hasCaption } = getDerivedState();
  const { setBottomText, setTopText, uploadCaption } = getActions();
  return div(
    { className: "page" },
    Meme({ bottomText, src, topText }),
    input({ placeholder: "Top Text", oninput: setTopText }),
    input({ placeholder: "Bottom Text", oninput: setBottomText }),
    button({ disabled: !hasCaption, onclick: uploadCaption }, "Upload Caption")
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

const getDerivedState = () => {
  const { bottomText, captions, czar, name, players, topText } = getState();
  const authors = captions.map(({ author }) => author);
  const citizens = players.filter((player) => player !== czar);
  return {
    canCaption: citizens.includes(name) && !authors.includes(name),
    canReveal: citizens.every((n) => authors.includes(n)) && authors.length > 0,
    hasCaption: topText.length > 0 || bottomText.length > 0,
    isCzar: name === czar,
    pendingAuthors: citizens.filter((n) => !authors.includes(n)),
  };
};

const getActions = () => {
  const revealMemes = () => {
    post("/reveal");
  };

  const setBottomText = (event) => {
    setState({ topText: event.target.value });
  };

  const setTopText = (event) => {
    setState({ topText: event.target.value });
  };

  const uploadCaption = () => {
    const { bottomText, name, topText } = getState();
    const caption = { author: name, bottomText, topText };
    post("/caption", JSON.stringify(caption)).then(() => {
      setState({ bottomText: "", topText: "" });
    });
  };

  return { revealMemes, setBottomText, setTopText, uploadCaption };
};
