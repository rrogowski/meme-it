const initialState = { bottomText: "", name: "", preview: "", topText: "" };

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SERVER_SYNCED":
      return { ...state, ...action.payload };
    case "SET_BOTTOM_TEXT":
      return { ...state, bottomText: action.payload };
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_PREVIEW":
      return { ...state, preview: action.payload };
    case "SET_TOP_TEXT":
      return { ...state, topText: action.payload };
    case "WEB_SOCKET_CLOSED":
      return { ...initialState, name: state.name };
    default:
      return state;
  }
};
