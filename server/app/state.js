export const createState = () => {
  let onStateChangeCallback;
  const state = {
    czar: "",
    phase: "SELECT_IMAGE",
    players: [],
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
