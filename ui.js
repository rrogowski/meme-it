let elementCache = {};
let activeElement = null;

const createNativeComponent = (tagName) => {
  return (properties) => {
    const activeElement = document.activeElement;
    console.log("@active", activeElement);

    const element =
      elementCache[properties.key] ?? document.createElement(tagName);

    if (element === document.activeElement) {
      activeElement = document.activeElement;
    }

    if (elementCache[properties.key]) {
      console.log("found cached element", element);
    }
    for (const [key, value] of Object.entries(properties)) {
      // console.log(key, value);
      if (key === "children") {
        element.append(...value);
      } else if (key === "ref") {
        properties.ref.current = element;
      } else if (key === "key") {
        elementCache[value] = element;
      } else {
        element[key] = value;
      }
    }
    // console.log(element);

    if (element === activeElement) {
      console.log("giving focus");
      element.focus();
    }

    return element;
  };
};

const Button = createNativeComponent("button");
const Div = createNativeComponent("div");
const Input = createNativeComponent("input");
const P = createNativeComponent("p");

const joinAsHost = () => {
  console.log("joining as host");
};

const joinAsPlayer = () => {
  console.log("joining as player", state);
};

const onNicknameInput = (event) => {
  console.log("setting nickname", event.target.value);
  setState({ nickname: event.target.value });
};

const MainMenu = () => {
  return Div({
    children: [
      Button({ onclick: joinAsHost, textContent: "Join as Host" }),
      Input({
        key: "nickname",
        oninput: onNicknameInput,
        placeholder: "Nickname",
        value: state.nickname,
      }),
      Button({ onclick: joinAsPlayer, textContent: "Join as Player" }),
    ],
  });
};

const render = (node) => {
  console.log("@render", node);
  console.log("active element", document.activeElement);
  // if (state.nickname === "") {
  // console.log("replacing");
  document.body.replaceChildren(node);
  // }
};

const state = {
  nickname: "",
};

const setState = (updates) => {
  for (const [key, value] of Object.entries(updates)) {
    state[key] = value;
  }
  render(MainMenu);
};

render(MainMenu);
