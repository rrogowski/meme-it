import { rotateLeft, shuffle } from "./array.js";

const initialState = {
  captions: [],
  czar: null,
  phase: "SELECT_IMAGE",
  players: [],
  winner: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "PLAYER_CONNECTED":
      return {
        ...state,
        czar: state.czar ?? action.payload,
        players: state.players.concat(action.payload),
      };
    case "PLAYER_DISCONNECTED":
      return {
        ...state,
        players: state.players.filter((p) => p !== action.payload),
      };
    case "REVEAL_MEMES":
      return {
        ...state,
        captions: shuffle(state.captions),
        phase: "REVEAL_MEMES",
      };
    case "SELECT_WINNER":
      return {
        ...state,
        phase: "SHOW_WINNER",
        winner: action.payload,
      };
    case "START_NEW_ROUND":
      return {
        ...initialState,
        czar: state.players.find((p) => p !== state.czar) ?? null,
        players: rotateLeft(state.players),
      };
    case "UPLOAD_CAPTION":
      return { ...state, captions: state.captions.concat(action.payload) };
    case "UPLOAD_IMAGE":
      return { ...state, phase: "CAPTION_IMAGE", src: action.payload };
    default:
      return state;
  }
};
