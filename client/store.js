import { createEmitter } from "./emitter.js";
import { reduce } from "./reducer.js";

let currentState = undefined;

const onStateChange = createEmitter();

export const state = {
  get derived() {
    return Object.freeze(getDerivedState(currentState));
  },
};

export const dispatch = (action) => {
  console.debug("[ACTION]", action);

  currentState = reduce(currentState, action);
  console.debug("[CURRENT STATE]", currentState);

  onStateChange.emit();
};

export const getCurrentState = () => {
  return Object.freeze({ ...currentState });
};

export const subscribe = (listener) => {
  onStateChange.addListener(listener);
  dispatch({ type: "STORE_INITIALIZED" });
};

const getDerivedState = (state) => {
  return {
    get canDecide() {
      const { captions } = state;
      return captions.every(({ wasViewed }) => wasViewed);
    },
  };
};
