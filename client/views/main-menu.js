import { actions } from "../actions.js";
import { getDerivedState } from "../helpers.js";
import { getCurrentState } from "../state.js";
import { button, div, input } from "../ui.js";

export const MainMenu = () => {
  const { name } = getCurrentState();
  const { isHost } = getDerivedState();
  const { joinAsHost, joinAsPlayer, setName } = actions;
  return div(
    { className: "page" },
    input({ placeholder: "name", value: name, oninput: setName }),
    button({ disabled: isHost, onclick: joinAsPlayer }, "Join as Player"),
    button({ disabled: !isHost, onclick: joinAsHost }, "Join as Host")
  );
};
