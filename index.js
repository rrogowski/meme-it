import { IMAGE_SRC_URL } from "./src/api/http.js";
import {
  initializeStateEmitter,
  setClientState,
  setServerState,
} from "./src/lib/state.js";
import { button, div, img, input, render, p } from "./src/lib/ui.js";
import { CaptionImage } from "./src/views/caption-image.js";
import { MainMenu } from "./src/views/main-menu.js";
import { SelectImage } from "./src/views/select-image.js";
import { SelectWinner } from "./src/views/select-winner.js";
import { Meme } from "./src/views/meme.js";

const HostSelectImageView = () => {
  if (state.game.turnPlayer === null) {
    return div({
      children: [
        p({
          textContent: `Waiting for at least one player to join...`,
        }),
      ],
    });
  }

  return div({
    children: [
      p({
        textContent: `Waiting for ${state.game.turnPlayer} to select an image...`,
      }),
    ],
  });
};

const HostCaptionImageView = () => {
  const otherPlayers = state.game.players.filter(
    (nickname) => nickname !== state.game.turnPlayer
  );

  if (otherPlayers.length > 0) {
    return div({
      children: [
        p({
          textContent: `Waiting for ${otherPlayers.join(", ")} to caption ${
            state.game.turnPlayer
          }'s image...`,
        }),
      ],
    });
  }
  return div({
    children: [
      p({
        textContent: `Waiting for more players to join...`,
      }),
    ],
  });
};

const HostSelectWinnerView = () => {
  const currentCaption = state.game.captions[state.game.captionIndex];
  return div({
    children: [
      img({ src: "http://localhost:8000/image" }),
      p({ textContent: currentCaption.topText }),
      p({ textContent: currentCaption.bottomText }),
      p({
        textContent: `Waiting for ${state.game.turnPlayer} to select a winner...`,
      }),
    ],
  });
};

const HostShowWinnerView = () => {
  const currentCaption = state.game.captions[state.game.captionIndex];
  return div({
    children: [
      img({ src: "http://localhost:8000/image" }),
      p({ textContent: currentCaption.topText }),
      p({ textContent: currentCaption.bottomText }),
      p({
        textContent: `${state.game.winner} won!`,
      }),
    ],
  });
};

const PlayerView = () => {
  switch (state.game.phase) {
    case "SELECT_IMAGE":
      return PlayerSelectImageView();
    case "CAPTION_IMAGE":
      return PlayerCaptionImageView();
    case "SELECT_WINNER":
      return PlayerSelectWinnerView();
    case "SHOW_WINNER":
      return PlayerShowWinnerView();
  }
};

const PlayerShowWinnerView = () => {
  if (state.nickname !== state.game.turnPlayer) {
    return div({
      children: [
        p({
          textContent: `Waiting for ${state.game.turnPlayer} to start next round...`,
        }),
      ],
    });
  }

  const currentCaption = state.game.captions[state.game.captionIndex];
  return div({
    children: [
      img({ src: "http://localhost:8000/image" }),
      p({ textContent: currentCaption.topText }),
      p({ textContent: currentCaption.bottomText }),
      p({ textContent: `${currentCaption.nickname} won!` }),
      button({ onclick: onNextRound, textContent: "Next Round" }),
    ],
  });
};

const onNextRound = () => {
  setState({
    ...INITIAL_STATE,
    game: state.game,
    isHost: state.isHost,
    nickname: state.nickname,
  });
  fetch("http://localhost:8000/reset", {
    method: "POST",
  })
    .then(console.log)
    .catch(console.error);
};

const PlayerSelectWinnerView = () => {
  if (state.nickname !== state.game.turnPlayer) {
    return div({
      children: [
        p({
          textContent: `Waiting for ${state.game.turnPlayer} to select a winner...`,
        }),
      ],
    });
  }

  const currentCaption = state.game.captions[state.game.captionIndex];

  return div({
    children: [
      img({ src: "http://localhost:8000/image" }),
      p({ textContent: currentCaption.topText }),
      p({ textContent: currentCaption.bottomText }),
      button({
        disabled: state.game.captionIndex === 0,
        onclick: onPreviousCaption,
        textContent: "<-",
      }),
      button({
        disabled: state.game.captionIndex === state.game.captions.length - 1,
        onclick: onNextCaption,
        textContent: "->",
      }),
      button({ onclick: onSelectWinner, textContent: "Select Winner" }),
    ],
  });
};

const onSelectWinner = () => {
  fetch("http://localhost:8000/decide", {
    method: "POST",
  })
    .then(console.log)
    .catch(console.error);
};

const onPreviousCaption = () => {
  fetch("http://localhost:8000/previous", {
    method: "POST",
  })
    .then(console.log)
    .catch(console.error);
};

const onNextCaption = () => {
  fetch("http://localhost:8000/next", {
    method: "POST",
  })
    .then(console.log)
    .catch(console.error);
};

const PlayerCaptionImageView = () => {
  if (state.nickname === state.game.turnPlayer) {
    const otherPlayers = state.game.players.filter(
      (nickname) => nickname !== state.game.turnPlayer
    );
    if (otherPlayers.length > 0) {
      return div({
        children: [
          p({
            textContent: `Waiting for ${otherPlayers.join(
              ", "
            )} to caption your image...`,
          }),
        ],
      });
    }
    return div({
      children: [
        p({
          textContent: `Waiting for more players to join...`,
        }),
      ],
    });
  }

  return div({
    children: [
      img({ src: "http://localhost:8000/image" }),
      input({
        key: "top-text",
        oninput: onChangeTopText,
        placeholder: "Top Text",
        value: state.topText,
      }),
      input({
        key: "bottom-text",
        oninput: onChangeBottomText,
        placeholder: "Bottom Text",
        value: state.bottomText,
      }),
      button({ onclick: onSubmitCaption, textContent: "Submit Caption" }),
    ],
  });
};

const onChangeTopText = (event) => {
  setState({ topText: event.target.value });
};

const onChangeBottomText = (event) => {
  setState({ bottomText: event.target.value });
};

const onSubmitCaption = () => {
  fetch("http://localhost:8000/caption", {
    body: JSON.stringify({
      bottomText: state.bottomText,
      nickname: state.nickname,
      topText: state.topText,
    }),
    method: "POST",
  })
    .then(console.log)
    .catch(console.error);
};

const PlayerSelectImageView = () => {
  if (state.nickname !== state.game.turnPlayer) {
    return div({
      children: [
        p({
          textContent: `Waiting for ${state.game.turnPlayer} to select an image...`,
        }),
      ],
    });
  }

  return div({
    children: [
      state.imageDataURL ? img({ src: state.imageDataURL }) : null,
      input({
        accept: "image/*",
        key: "file",
        onchange: onChangeImage,
        type: "file",
      }),
      button({
        disabled: state.imageDataURL === null,
        onclick: onUploadImage,
        textContent: "Ready!",
      }),
    ],
  });
};

const onChangeImage = (event) => {
  const file = event.target.files[0];
  if (!file) {
    setState({ imageDataURL: null, imageFile: null });
    return;
  }
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    setState({ imageDataURL: reader.result, imageFile: file });
  });
  reader.readAsDataURL(file);
};

const onUploadImage = () => {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    fetch("http://localhost:8000/upload", {
      body: reader.result,
      method: "POST",
    })
      .then(console.log)
      .catch(console.error);
  });
  reader.readAsArrayBuffer(state.imageFile);
};

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
    case "SHOW_WINNER":
      return ShowWinner;
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
    preview: IMAGE_SRC_URL,
  },
  server: {
    author: "other",
    canVote: true,
    captions: [
      { author: "other", top: "helo", bottom: "boi" },
      { author: "other", top: "helo", bottom: "boi" },
      { author: "other", top: "helo", bottom: "boi" },
    ],
    index: 1,
    names: ["other", "rogowski"],
    phase: "SELECT_IMAGE",
    uploader: "other",
  },
};

Object.assign(INITIAL_STATE, state);
initializeStateEmitter(INITIAL_STATE, (state) => {
  console.log(state.client, state.server);
  render(() => App(state));
});

render(() => {
  return div({ style: "width: 100vw; height: 100vh" }, SelectImage(state));
});
