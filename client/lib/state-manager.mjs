export const createStateManager = (state) => {
  let onStateChangeCallback;
  return {
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
