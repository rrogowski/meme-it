import { initializeWebSocket } from "../socket.js";
import { dispatch, getState } from "../store.js";
import { button, div, input } from "../ui.js";

export const MainMenu = () => {
  const { name } = getState();
  const { isHost } = getDerivedState();
  return div(
    { className: "page" },
    input({ placeholder: "name", value: name, oninput: setName }),
    button({ disabled: isHost, onclick: joinAsPlayer }, "Join as Player"),
    button({ disabled: !isHost, onclick: joinAsHost }, "Join as Host")
  );
};

const getDerivedState = () => {
  const { name } = getState();
  return { isHost: name === "" };
};

const joinAsHost = () => {
  initializeWebSocket();
};

const joinAsPlayer = () => {
  const { name } = getState();
  initializeWebSocket({ name });
};

const setName = (event) => {
  window.localStorage.setItem("name", event.target.value);
  dispatch({ type: "SET_NAME", payload: event.target.value });
};
