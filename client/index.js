import { subscribe } from "./store.js";
import { render } from "./ui.js";
import { App } from "./views/app.js";

subscribe(() => render(App));
