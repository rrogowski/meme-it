let image = null;
let imageNumber = 0;

export const createEndpoints = ({ actions }) => {
  return (request, response) => {
    switch (request.url) {
      case "/upload":
        imageNumber++;
        let chunks = [];
        request.on("data", (chunk) => {
          chunks.push(chunk);
        });
        request.on("end", () => {
          image = Buffer.concat(chunks);
          actions.uploadImage(imageNumber);
          response.setHeader("Access-Control-Allow-Origin", "*");
          response.end();
        });
        break;
      case `/image/${imageNumber}`:
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Content-Type", "image/png");
        response.write(image);
        response.end();
        break;
      case "/caption": {
        let chunks = [];
        request.on("data", (chunk) => {
          chunks.push(chunk);
        });
        request.on("end", () => {
          const body = Buffer.concat(chunks).toString();
          const caption = JSON.parse(body);
          actions.submitCaption(caption);
          response.setHeader("Access-Control-Allow-Origin", "*");
          response.end();
        });
        break;
      }
      case "/next":
        actions.goToNextCaption();
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.end();
        break;
      case "/prev":
        response.setHeader("Access-Control-Allow-Origin", "*");
        actions.goToPrevCaption();
        response.end();
        break;
      case "/reveal":
        actions.revealMemes();
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.end();
        break;
      case "/decide":
        actions.startNewRound();
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.end();
        break;
    }
  };
};
