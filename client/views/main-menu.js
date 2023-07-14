import { dispatch, getState } from "../store.js";
import { button, div, input } from "../ui.js";
import { openWebSocket } from "../web-socket.js";

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
  openWebSocket({});
};

const joinAsPlayer = () => {
  const { name } = getState();
  openWebSocket({ name });
};

const setName = (event) => {
  dispatch({ type: "SET_NAME", payload: event.target.value });
};
