import { rotateLeft, shuffle } from "./array.js";

const initialState = {
  captions: [],
  czar: null,
  index: 0,
  phase: "SELECT_IMAGE",
  players: [],
  revealed: 0,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "DECIDE_WINNER":
      return {
        ...initialState,
        czar: state.players.find((name) => name !== state.czar),
        players: rotateLeft(state.players),
      };
    case "PLAYER_CONNECTED":
      return state.players.length === 0
        ? { ...initialState, czar: action.payload, players: [action.payload] }
        : { ...state, players: state.players.concat(action.payload) };
    case "PLAYER_DISCONNECTED":
      return {
        ...state,
        players: state.players.filter((name) => name !== action.payload),
      };
    case "REVEAL_MEMES":
      return {
        ...state,
        captions: shuffle(state.captions),
        phase: "REVEAL_MEMES",
        revealed: 1,
      };
    case "SET_INDEX":
      return {
        ...state,
        index: action.payload,
        revealed: Math.max(state.revealed, action.payload + 1),
      };
    case "UPLOAD_CAPTION":
      return { ...state, captions: state.captions.concat(action.payload) };
    case "UPLOAD_IMAGE":
      return { ...state, phase: "CAPTION_IMAGE", src: action.payload };
    default:
      return state;
  }
};
