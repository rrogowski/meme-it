export const createEmitter = () => {
  const listeners = [];

  const emit = (data) => {
    listeners.forEach((listener) => listener(data));
  };

  const subscribe = (listener) => {
    listeners.push(listener);
  };

  return { emit, subscribe };
};
