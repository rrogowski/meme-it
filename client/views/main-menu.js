import { actions } from "../actions.js";
import { getCurrentState } from "../store.js";
import { button, div, input } from "../ui.js";

export const MainMenu = () => {
  const { name } = getCurrentState();
  const { joinAsHost, joinAsPlayer, setName } = actions;
  return div(
    { className: "page" },
    input({ placeholder: "name", value: name, oninput: setName }),
    button({ disabled: !name, onclick: joinAsPlayer }, "Join as Player"),
    button({ disabled: name, onclick: joinAsHost }, "Join as Host")
  );
};
