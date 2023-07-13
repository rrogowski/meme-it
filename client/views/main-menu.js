import { getDerivedState } from "../helpers.js";
import { getCurrentState, setState } from "../state.js";
import { button, div, input } from "../ui.js";
import { openWebSocket } from "../web-socket.js";

export const MainMenu = () => {
  const { name } = getCurrentState();
  const { isHost } = getDerivedState();
  return div(
    { className: "page" },
    input({ placeholder: "name", value: name, oninput: setName }),
    button({ disabled: isHost, onclick: openWebSocket }, "Join as Player"),
    button({ disabled: !isHost, onclick: openWebSocket }, "Join as Host")
  );
};

const setName = (event) => {
  setState({ name: event.target.value });
};
