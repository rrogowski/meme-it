import { button, div, input } from "../lib/ui.mjs";

export const MainMenu = ({ actions, state }) => {
  const { connectAsHost, connectAsPlayer, setName } = actions;
  const { isHost, name } = state;
  return div(
    { className: "main-menu" },
    input({ placeholder: "name", value: name, oninput: setName }),
    button({ disabled: isHost, onclick: connectAsPlayer }, "Join as Player"),
    button({ disabled: !isHost, onclick: connectAsHost }, "Join as Host")
  );
};
