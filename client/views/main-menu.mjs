import { button, div, input } from "../lib/ui.mjs";

export const MainMenu = ({ actions, state }) => {
  const { connectToServer, setName } = actions;
  const { isHost, name } = state;
  return div(
    { className: "main-menu" },
    input({ key: "name", oninput: setName, placeholder: "name", value: name }),
    button({ disabled: isHost, onclick: connectToServer }, "Join as Player"),
    button({ disabled: !isHost, onclick: connectToServer }, "Join as Host")
  );
};
