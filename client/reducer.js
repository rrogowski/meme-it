const INITIAL_STATE = { name: "" };

export const reduce = (state, action) => {
  switch (action.type) {
    case "APP_INITIALIZED":
      return INITIAL_STATE;
    case "WEB_SOCKET_CLOSED":
      return { ...INITIAL_STATE, name: state.name };
    default: {
      return { ...state, ...action.payload };
    }
  }
};
