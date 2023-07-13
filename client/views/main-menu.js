import { actions } from "../actions.js";
import { button, div, input } from "../lib/ui.js";
import { state } from "../store.js";

export const MainMenu = () => {
  const { name } = state.current;
  const { isHost } = state.derived;
  const { joinAsHost, joinAsPlayer, setName } = actions;
  return div(
    { className: "main-menu" },
    input({ placeholder: "name", value: name, oninput: setName }),
    button({ disabled: isHost, onclick: joinAsPlayer }, "Join as Player"),
    button({ disabled: !isHost, onclick: joinAsHost }, "Join as Host")
  );
};
