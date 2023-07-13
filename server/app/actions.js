import { rotate, shuffle } from "../lib/array.js";

export const createActions = ({ address, port, state, setState }) => {
  return {
    addPlayer({ isHost, name }) {
      const { czar, players } = state;
      setState({
        czar: czar ? czar : name,
        players: isHost ? players : players.concat(name),
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
      const { players } = state;
      setState({ players: players.filter((player) => player !== name) });
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
      const { players } = state;
      rotate(players);
      setState({ czar: players[0], phase: "SELECT_IMAGE", players });
    },
    uploadImage(imageNumber) {
      const src = `http://${address}:${port}/image/${imageNumber}`;
      setState({ captions: [], phase: "CAPTION_IMAGE", src });
    },
  };
};
