import { initializeStateEmitter } from "./src/lib/state.js";
import { render } from "./src/lib/ui.js";
import { CaptionImage } from "./src/views/caption-image.js";
import { MainMenu } from "./src/views/main-menu.js";
import { SelectImage } from "./src/views/select-image.js";
import { RevealMemes } from "./src/views/reveal-memes.js";

const App = (state) => {
  switch (state.server.phase) {
    case "SELECT_IMAGE":
      return SelectImage(state);
    case "CAPTION_IMAGE":
      return CaptionImage(state);
    case "REVEAL_MEMES":
      return RevealMemes(state);
    default:
      return MainMenu(state);
  }
};

const INITIAL_STATE = {
  client: { bottomText: null, name: null, topText: null },
  server: null,
};

initializeStateEmitter(INITIAL_STATE, (state) => {
  console.log(state.client, state.server);
  render(() => {
    return App(state);
  });
});
