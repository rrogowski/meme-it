export const post = (endpoint, body) => {
  const url = `http://${window.location.hostname}:8000`.concat(endpoint);
  fetch(url, { body, method: "POST" });
};
