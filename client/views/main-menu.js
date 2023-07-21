import { initializeWebSocket } from "../socket.js";
import { dispatch, getCurrentState } from "../store.js";
import { button, div, input } from "../ui.js";

export const MainMenu = () => {
  const { name } = getCurrentState();
  const { isHost } = getDerivedState();
  return div(
    { className: "page" },
    input({ placeholder: "name", value: name, oninput: setName }),
    button({ disabled: isHost, onclick: joinAsPlayer }, "Join as Player"),
    button({ disabled: !isHost, onclick: joinAsHost }, "Join as Host")
  );
};

const getDerivedState = () => {
  const { name } = getCurrentState();
  return { isHost: name === "" };
};

const joinAsHost = () => {
  initializeWebSocket();
};

const joinAsPlayer = () => {
  const { name } = getCurrentState();
  initializeWebSocket({ name });
};

const setName = (event) => {
  dispatch({ type: "SET_NAME", payload: event.target.value });
};
