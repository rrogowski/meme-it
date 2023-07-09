const SERVER_HREF = `http://${window.location.hostname}:8000`;

export const postCaption = (caption) => {
  return post("/caption", JSON.stringify(caption));
};

export const previousCaption = (index) => {
  return post("/previous", index);
};

export const nextCaption = (index) => {
  return post("/next", index);
};

export const revealMemes = () => {
  return post("/reveal");
};

export const startNewRound = () => {
  return post("/reset");
};

export const post = (url, body) => {
  return fetch(SERVER_HREF.concat(url), { body, method: "POST" });
};
