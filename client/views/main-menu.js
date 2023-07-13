import { getCurrentState, setState } from "../state.js";
import { button, div, input } from "../ui.js";
import { openWebSocket } from "../web-socket.js";

export const MainMenu = () => {
  const { name } = getCurrentState();
  const { isHost } = getDerivedState();
  const { joinAsHost, joinAsPlayer, setName } = getActions();
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

const getActions = () => {
  const joinAsHost = () => {
    openWebSocket();
  };

  const joinAsPlayer = () => {
    const { name } = getCurrentState();
    openWebSocket({ name });
  };

  const setName = (event) => {
    setState({ name: event.target.value });
  };

  return { joinAsHost, joinAsPlayer, setName };
};
