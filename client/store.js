import { createEmitter } from "./emitter.js";
import { reduce } from "./reducer.js";

let currentState = undefined;

const onStateChange = createEmitter();

export const state = {
  get current() {
    return Object.freeze({ ...currentState });
  },
  get derived() {
    return Object.freeze(getDerivedState(currentState));
  },
};

export const dispatch = (action) => {
  console.debug("[ACTION]", action);

  currentState = reduce(currentState, action);
  console.debug("[CURRENT STATE]", getCurrentState());

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
    get canCaption() {
      const { captions, name } = state;
      const { isHost } = this;
      const authors = captions.map(({ author }) => author);
      return !isHost && !authors.includes(name);
    },
    get canDecide() {
      const { captions } = state;
      return captions.every(({ wasViewed }) => wasViewed);
    },
    get canReveal() {
      const { captions, names, uploader } = state;
      const authors = captions.map(({ author }) => author);
      return names
        .filter((name) => name !== uploader)
        .every((name) => authors.includes(name));
    },
    get caption() {
      const { captions, index } = state;
      return captions[index];
    },
    get hasNextCaption() {
      const { captions, index } = state;
      return index < captions.length - 1;
    },
    get hasPrevCaption() {
      const { index } = state;
      return index > 0;
    },
    get isCaptionInvalid() {
      const { bottomText, topText } = state;
      return !bottomText && !topText;
    },
    get isHost() {
      const { name } = state;
      return !name;
    },
    get isUploader() {
      const { name, uploader } = state;
      return name === uploader;
    },
    get pendingAuthors() {
      const { captions, names, uploader } = state;
      const authors = captions.map(({ author }) => author);
      return names
        .filter((name) => name !== uploader)
        .filter((name) => !authors.includes(name));
    },
  };
};
