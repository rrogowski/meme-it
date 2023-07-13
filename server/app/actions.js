import { rotate, shuffle } from "../lib/array.js";

export const createActions = ({ address, port, state, setState }) => {
  return {
    addPlayer({ isHost, name }) {
      const { czar, names } = state;
      setState({
        names: isHost ? names : names.concat(name),
        czar: czar ? czar : name,
      });
    },
    goToNextCaption() {
      const { captions, index } = state;
      captions[index + 1].wasViewed = true;
      setState({ captions, index: index + 1 });
    },
    goToPrevCaption() {
      const { index } = state;
      setState({ index: index - 1 });
    },
    removePlayer({ name }) {
      const { names } = state;
      setState({ names: names.filter((n) => n !== name) });
    },
    revealMemes() {
      const { captions } = state;
      shuffle(captions);
      captions[0].wasViewed = true;
      setState({ captions, index: 0, phase: "REVEAL_MEMES" });
    },
    submitCaption(caption) {
      const { captions } = state;
      captions.push(caption);
      setState({ captions });
    },
    startNewRound() {
      const { names } = state;
      rotate(names);
      setState({ czar: names[0], names, phase: "SELECT_IMAGE" });
    },
    uploadImage(imageNumber) {
      const src = `http://${address}:${port}/image/${imageNumber}`;
      setState({ captions: [], phase: "CAPTION_IMAGE", src });
    },
  };
};
