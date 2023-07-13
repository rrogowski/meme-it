export const createEmitter = () => {
  const listeners = [];

  const addListener = (listener) => {
    listeners.push(listener);
  };

  const emit = () => {
    listeners.forEach((listener) => listener());
  };

  return { emit, addListener };
};
