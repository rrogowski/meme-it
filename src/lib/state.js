const client = {};
const server = {};

let onStateChangeCallback;

export const initializeStateEmitter = (initialState, onStateChange) => {
  onStateChangeCallback = onStateChange;
  setState(initialState);
};

export const setClientState = (updates) => {
  setState({ client: updates });
};

export const setServerState = (updates) => {
  setState({ server: updates });
};

const setState = (updates) => {
  Object.assign(client, updates.client);
  Object.assign(server, updates.server);
  onStateChangeCallback?.({ client, server });
};
