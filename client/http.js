import { getCurrentState } from "./state.js";

export const decideWinner = () => {
  post("/winner");
};

export const goToNextCaption = () => {
  post("/next");
};

export const goToPrevCaption = () => {
  post("/prev");
};

export const revealMemes = () => {
  post("/reveal");
};

export const uploadCaption = () => {
  const { bottomText, name, topText } = getCurrentState();
  const caption = { author: name, bottomText, topText };
  post("/caption", JSON.stringify(caption));
};

const post = (endpoint, body) => {
  const url = `http://${window.location.hostname}:8000`.concat(endpoint);
  fetch(url, { body, method: "POST" });
};
