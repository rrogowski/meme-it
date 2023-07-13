export const createEventEmitter = () => {
  const listeners = {};

  const emit = (eventName, data) => {
    listeners[eventName].forEach((listener) => listener(data));
  };

  const on = (eventName, listener) => {
    listeners[eventName] ??= [];
    listeners[eventName].push(listener);
  };

  return { emit, on };
};
