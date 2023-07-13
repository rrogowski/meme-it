import { render } from "./client/lib/ui.js";
import { subscribe } from "./client/store.js";
import { App } from "./client/views/app.js";

subscribe(() => render(App));
