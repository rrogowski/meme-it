import { dispatch } from "./store.js";

export const revealMemes = () => {
  post("/reveal");
};

export const startNewRound = () => {
  post("/new_round");
};

export const selectWinner = (author) => {
  post("/winner", author);
};

export const uploadCaption = async (caption) => {
  await post("/caption", JSON.stringify(caption));
  dispatch({ type: "SET_TOP_TEXT", payload: "" });
  dispatch({ type: "SET_BOTTOM_TEXT", payload: "" });
};

export const uploadImage = async (preview) => {
  const response = await fetch(preview);
  const arrayBuffer = await response.arrayBuffer();
  await post("/upload", arrayBuffer);
  dispatch({ type: "SET_PREVIEW", payload: "" });
};

const post = (endpoint, body) => {
  const url = `http://${window.location.hostname}:9000`.concat(endpoint);
  return fetch(url, { body, method: "POST" });
};
