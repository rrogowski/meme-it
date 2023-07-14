import { createServer } from "http";
import { getNetworkIpv4Address } from "./ipv4.js";
import { acceptWebSocketUpgrade } from "./socket.js";
import { dispatch } from "./store.js";

let imageNumber = 0;
let lastImage = null;

export const server = createServer();
server.on("upgrade", acceptWebSocketUpgrade);
server.on("request", async (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  switch (request.url) {
    case "/decide":
      dispatch({ type: "DECIDE_WINNER" });
      response.end();
      break;
    case "/caption": {
      const buffer = await parseRequestData(request);
      const data = buffer.toString();
      dispatch({ type: "UPLOAD_CAPTION", payload: JSON.parse(data) });
      response.end();
      break;
    }
    case `/image/${imageNumber}`:
      response.setHeader("Content-Type", "image/png");
      response.write(lastImage);
      response.end();
      break;
    case "/index":
      const buffer = await parseRequestData(request);
      const index = Number(buffer.toString());
      dispatch({ type: "SET_INDEX", payload: index });
      response.end();
      break;
    case "/reveal":
      dispatch({ type: "REVEAL_MEMES" });
      response.end();
      break;
    case "/upload":
      imageNumber++;
      lastImage = await parseRequestData(request);
      const { port } = server.address();
      const src = `http://${getNetworkIpv4Address()}:${port}/image/${imageNumber}`;
      dispatch({ type: "UPLOAD_IMAGE", payload: src });
      response.end();
      break;
    default:
      response.statusCode = 404;
      response.end();
      break;
  }
});

const parseRequestData = (request) => {
  return new Promise((resolve, reject) => {
    const chunks = [];
    request.on("data", (chunk) => {
      chunks.push(chunk);
    });
    request.on("error", (error) => {
      reject(error);
    });
    request.on("end", () => {
      const buffer = Buffer.concat(chunks);
      resolve(buffer);
    });
  });
};
