import { initializeStateEmitter } from "./src/lib/state.js";
import { render } from "./src/lib/ui.js";
import { CaptionImage } from "./src/views/caption-image.js";
import { MainMenu } from "./src/views/main-menu.js";
import { SelectImage } from "./src/views/select-image.js";
import { RevealMemes } from "./src/views/reveal-memes.js";

const App = (state) => {
  const View = getView(state.server.phase);
  return View(state);
};

const getView = (phase) => {
  switch (phase) {
    case "SELECT_IMAGE":
      return SelectImage;
    case "CAPTION_IMAGE":
      return CaptionImage;
    case "REVEAL_MEMES":
      return RevealMemes;
    default:
      return MainMenu;
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
