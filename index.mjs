import { createActions } from "./client/app/actions.mjs";
import { createState } from "./client/app/state.mjs";
import { createStateManager } from "./client/lib/state-manager.mjs";
import { render } from "./client/lib/ui.mjs";
import { App } from "./client/views/app.mjs";

const INITIAL_STATE = { bottomText: null, name: null, topText: null };

const state = createState(INITIAL_STATE);
const { onStateChange, setState } = createStateManager(state);
const actions = createActions({ state, setState });
onStateChange(() => render(App, { actions, state }));
