let state = { bottomText: "", name: "", preview: "", topText: "" };

const listeners = [];

export const getState = () => {
  return Object.freeze({ ...state });
};

export const setState = (updates) => {
  state = { ...state, ...updates };
  listeners.forEach((listener) => listener());
};

export const subscribe = (listener) => {
  listeners.push(listener);
  listener();
};
