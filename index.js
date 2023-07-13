import { render } from "./client/lib/ui.js";
import { initialize } from "./client/store.js";
import { App } from "./client/views/app.js";

initialize(() => render(App));
