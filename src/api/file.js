export const readFileAsDataURL = (file, onResult) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => onResult(reader.result));
  reader.readAsDataURL(file);
};

export const getArrayBufferFromDataURL = (dataURL, onResult) => {
  fetch(dataURL)
    .then((result) => result.arrayBuffer())
    .then((result) => onResult(result));
};
