import { initializeStateEmitter } from "./src/lib/state.js";
import { render } from "./src/lib/ui.js";
import { CaptionImage } from "./src/views/caption-image.js";
import { MainMenu } from "./src/views/main-menu.js";
import { SelectImage } from "./src/views/select-image.js";
import { SelectWinner } from "./src/views/select-winner.js";

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
    case "SELECT_WINNER":
      return SelectWinner;
    default:
      return MainMenu;
  }
};

const INITIAL_STATE = {
  client: { name: "" },
  server: null,
};

// for testing purposes only
const state = {
  client: {
    caption: { top: "boi", bottom: "you know i had to do it to em" },
    name: "other",
    isHost: false,
    preview: "http://192.168.1.66:8000/image",
  },
  server: {
    author: "other",
    canVote: true,
    captions: [
      // { author: "rogowski", top: "helo", bottom: "boi" },
      // { author: "other", top: "helo", bottom: "boi" },
      // { author: "other", top: "helo", bottom: "boi" },
    ],
    index: 1,
    names: ["other", "rogowski"],
    phase: "SELECT_IMAGE",
    src: "http://192.168.1.66:8000/image",
    uploader: "other",
  },
};

initializeStateEmitter(state, (state) => {
  console.log(state.client, state.server);
  render(() => {
    return SelectWinner(state);
  });
});
