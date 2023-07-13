let currentState = { bottomText: "", name: "", preview: "", topText: "" };

const listeners = [];

export const getCurrentState = () => {
  return Object.freeze({ ...currentState });
};

export const getDerivedState = () => {
  const { name } = getCurrentState();
  return { isHost: name === "" };
};

export const setState = (updates) => {
  currentState = { ...currentState, ...updates };
  listeners.forEach((listener) => listener());
};

export const subscribe = (listener) => {
  listeners.push(listener);
  listener();
};
