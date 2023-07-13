import { getCurrentState } from "./store";

export const getDerivedState = () => {
  const { name, uploader } = getCurrentState();
  return {
    isHost: name === "",
    isUploader: name === uploader,
  };
};
