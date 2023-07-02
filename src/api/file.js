export const readFileAsArrayBuffer = (file, onResult) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => onResult(reader.result));
  reader.readAsArrayBuffer(file);
};

export const readFileAsDataURL = (file, onResult) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => onResult(reader.result));
  reader.readAsDataURL(file);
};
