import { button, div, input } from "../lib/ui.js";

export const MainMenu = ({ client, server }) => {
  const { name } = client.state;
  const { setName } = client.actions;
  const { connect } = server.actions;
  return div(
    { className: "main-menu" },
    input({ key: "name", oninput: setName, placeholder: "name", value: name }),
    button({ disabled: !name, onclick: connect }, "Join as Player"),
    button({ disabled: name, onclick: connect }, "Join as Host")
  );
};
