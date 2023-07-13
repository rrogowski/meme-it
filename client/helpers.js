import { getCurrentState } from "./store";

export const getDerivedState = () => {
  const { name, uploader } = getCurrentState();
  return {
    hasUploader: uploader !== undefined,
    isHost: name === "",
    isUploader: name === uploader,
  };
};
