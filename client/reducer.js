const INITIAL_STATE = { bottomText: "", name: "", preview: "", topText: "" };

export const reduce = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "WEB_SOCKET_CLOSED":
      return { ...INITIAL_STATE, name: state.name };
    default: {
      return { ...state, ...action.payload };
    }
  }
};
