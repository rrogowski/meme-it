import { dispatch } from "./store.js";

export const openFileDialog = () => {
  const fileInput = document.querySelector("input[type=file]");
  const event = new MouseEvent("click");
  fileInput.dispatchEvent(event);
};

export const readAsDataURL = (file) => {
  if (!file) {
    dispatch({ type: "SET_PREVIEW", payload: "" });
    return;
  }
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    dispatch({ type: "SET_PREVIEW", payload: reader.result });
  });
  reader.readAsDataURL(file);
};
