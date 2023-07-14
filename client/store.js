import { reducer } from "./reducer.js";

let state = { bottomText: "", name: "", preview: "", topText: "" };

const listeners = [];

export const dispatch = (action) => {
  console.debug("[ACTION]", action);
  state = reducer(state, action);
  console.debug("[STATE]", state);
  listeners.forEach((listener) => listener());
};

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
