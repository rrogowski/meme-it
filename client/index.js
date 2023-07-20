import { dispatch, subscribe } from "./store.js";
import { render } from "./ui.js";
import { App } from "./views/app.js";

subscribe(() => render(App));

const name = window.localStorage.getItem("name") ?? "";
dispatch({ type: "SET_NAME", payload: name });
