import { subscribe } from "./store.js";
import { render } from "./ui.js";
import { App } from "./views/app";

subscribe(() => render(App));
