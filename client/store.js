import { reducer } from "./reducer.js";

let state = undefined;

const listeners = [];

export const dispatch = (action) => {
  console.debug("[ACTION]", action);
  state = reducer(state, action);
  console.debug("[STATE]", state);
  listeners.forEach((listener) => listener());
};

export const getCurrentState = () => {
  return Object.freeze({ ...state });
};

export const subscribe = (listener) => {
  listeners.push(listener);
  dispatch({ type: "STORE_INITIALIZED" });
};
