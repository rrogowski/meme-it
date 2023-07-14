import { openWebSocket } from "../http.js";
import { getState, setState } from "../state.js";
import { button, div, input } from "../ui.js";

export const MainMenu = () => {
  const { name } = getState();
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
  const { name } = getState();
  return { isHost: name === "" };
};

const getActions = () => {
  const joinAsHost = () => {
    openWebSocket();
  };

  const joinAsPlayer = () => {
    const { name } = getState();
    openWebSocket({ name });
  };

  const setName = (event) => {
    setState({ name: event.target.value });
  };

  return { joinAsHost, joinAsPlayer, setName };
};
