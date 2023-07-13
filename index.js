import { render } from "./client/ui.js";
import { dispatch, subscribe } from "./client/store.js";
import { App } from "./client/views/app.js";
import { SelectImage } from "./client/views/select-image.js";

// subscribe(() => render(App));

subscribe(() => render(SelectImage));
const payload = { name: "1", uploader: "1" };
dispatch({ type: "DEBUG", payload });
