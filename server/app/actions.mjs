import { rotate, shuffle } from "../lib/array.mjs";

export const createActions = ({ address, port, state, setState }) => {
  return {
    addPlayer({ isHost, name }) {
      const { names, uploader } = state;
      setState({
        names: isHost ? names : names.concat(name),
        uploader: uploader ? uploader : name,
      });
    },
    goToNextCaption() {
      const { captions, index } = state;
      index++;
      captions[index].wasViewed = true;
      setState({ captions, index });
    },
    goToPrevCaption() {
      const { index } = state;
      index--;
      setState({ index });
    },
    removePlayer({ isHost, name }) {
      const { names } = state;
      setState({ names: isHost ? names : names.filter((n) => n !== name) });
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
      setState({ names, phase: "SELECT_IMAGE", uploader: names[0] });
    },
    uploadImage(imageNumber) {
      const src = `http://${address}:${port}/image/${imageNumber}`;
      setState({ captions: [], phase: "CAPTION_IMAGE", src });
    },
  };
};
