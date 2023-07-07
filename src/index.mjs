import { onStateChange } from "./lib/state.js";
import { render } from "./lib/ui.js";
import { client, server } from "./state/state.mjs";
import { App } from "./views/app.mjs";

const renderApp = () => render(App.bind(null, { client, server }));
onStateChange(renderApp);
