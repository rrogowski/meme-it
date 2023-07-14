import { render } from "./ui.js";
import { subscribe } from "./store.js";
import { App } from "./views/app.js";

subscribe(() => render(App));
