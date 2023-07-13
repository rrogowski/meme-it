import { actions } from "../actions.js";
import { getCurrentState, state } from "../store.js";
import { button, div, input } from "../ui.js";

export const MainMenu = () => {
  const { name } = getCurrentState();
  const { isHost } = state.derived;
  const { joinAsHost, joinAsPlayer, setName } = actions;
  return div(
    { className: "main-menu" },
    input({ placeholder: "name", value: name, oninput: setName }),
    button({ disabled: isHost, onclick: joinAsPlayer }, "Join as Player"),
    button({ disabled: !isHost, onclick: joinAsHost }, "Join as Host")
  );
};
