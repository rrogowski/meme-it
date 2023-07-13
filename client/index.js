import { subscribe } from "./state.js";
import { render } from "./ui.js";
import { App } from "./views/app.js";

subscribe(() => render(App));
