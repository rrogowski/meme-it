import { createWebSocketConnection } from "../api/socket.js";
import { setClientState } from "../lib/state.js";
import { button, div, input } from "../lib/ui.js";

export const MainMenu = ({ client }) => {
  const { name } = client;
  const joinAsHost = () => joinGame({ isHost: true });
  const joinAsPlayer = () => joinGame({ isHost: false, name });
  return div(
    { className: "main-menu" },
    input({ key: "name", oninput: setName, placeholder: "name", value: name }),
    button("Join as Player", { disabled: !name, onclick: joinAsPlayer }),
    button("Join as Host", { disabled: name, onclick: joinAsHost })
  );
};

const joinGame = ({ isHost, name }) => {
  setClientState({ isHost });
  createWebSocketConnection({ isHost, name });
};

const setName = (event) => {
  setClientState({ name: event.target.value });
};
