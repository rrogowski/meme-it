import { getCurrentState } from "./store.js";

export const getDerivedState = () => {
  const { captions = [], name, names = [], uploader } = getCurrentState();
  const authors = captions.map(({ author }) => author);
  return {
    canCaption: names.includes(name) && !authors.includes(name),
    isHost: name === "",
    isUploader: name === uploader,
  };
};
