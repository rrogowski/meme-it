export const createState = () => {
  let onStateChangeCallback;
  const state = {
    names: [],
    phase: "SELECT_IMAGE",
  };
  return {
    state,
    onStateChange(callback) {
      onStateChangeCallback = callback;
      callback();
    },
    setState(updates) {
      Object.assign(state, updates);
      onStateChangeCallback?.();
    },
  };
};
