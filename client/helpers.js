import { getCurrentState } from "./store";

export const getDerivedState = () => {
  const { name } = getCurrentState();
  return {
    isHost: !name,
  };
};
