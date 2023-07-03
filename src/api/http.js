const SERVER_IP = "http://192.168.1.66:8000";

export const IMAGE_SRC_URL = SERVER_IP.concat("/image");

export const uploadImage = (file) => {
  return post("/upload", file);
};

export const postCaption = (caption) => {
  return post("/caption", JSON.stringify(caption));
};

export const previousCaption = (index) => {
  return post("/previous", index);
};

export const nextCaption = (index) => {
  return post("/next", index);
};

const post = (url, body) => {
  return fetch(SERVER_IP.concat(url), { body, method: "POST" });
};
