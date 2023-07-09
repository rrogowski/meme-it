import { onStateChange } from "./client/lib/state.js";
import { render } from "./client/lib/ui.js";
import { client } from "./client/state/client.mjs";
import { server } from "./client/state/server.mjs";
import { App } from "./client/views/app.mjs";

const renderApp = () => render(App.bind(null, { client, server }));
onStateChange(renderApp);
