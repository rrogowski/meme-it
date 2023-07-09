const SERVER_HREF = `http://${window.location.hostname}:8000`;

export const post = (endpoint, body) => {
  return fetch(SERVER_HREF.concat(endpoint), { body, method: "POST" });
};
