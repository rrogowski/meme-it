let onStateChangeCallback;

export const createState = (initialState) => {
  const state = initialState;
  return {
    state,
    setState(updates) {
      Object.assign(state, updates);
      onStateChangeCallback?.();
    },
  };
};

export const onStateChange = (callback) => {
  onStateChangeCallback = callback;
  onStateChangeCallback();
};
