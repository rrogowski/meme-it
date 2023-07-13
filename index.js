import { subscribe } from "./client/store.js";
import { render } from "./client/ui.js";
import { App } from "./client/views/app.js";

subscribe(() => render(App));

// subscribe(() => render(SelectImage));
// const payload = { name: "1", uploader: "1" };
// dispatch({ type: "DEBUG", payload });
