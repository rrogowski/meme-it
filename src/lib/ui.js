let elementCache = {};

const createNativeComponent = (tagName) => {
  return (...args) => {
    const { key, ...attributes } = args.find(isAttributes) ?? {};
    const element = elementCache[key] ?? document.createElement(tagName);
    if (key) {
      elementCache[key] = element;
    }

    const modifiedAttributes = getModifiedAttributes(element, attributes);
    Object.assign(element, modifiedAttributes);

    const children = args.filter(isValidNode);
    element.replaceChildren(...children);
    return element;
  };
};

// Setting some attributes (e.g. an image `src` attribute) will trigger a
// slow repaint, even if the value of the attribute has not changed.
const getModifiedAttributes = (element, attributes) => {
  const entries = Object.entries(attributes);
  const modifiedEntries = entries.filter(([name, value]) => {
    if (name === "src") {
      console.log("original", element[name], "new", value);
    }
    return element[name] !== value;
  });
  return Object.fromEntries(modifiedEntries);
};

const isValidNode = (arg) => {
  return typeof arg === "string" || arg instanceof HTMLElement;
};

const isAttributes = (arg) => {
  return typeof arg === "object" && !isValidNode(arg);
};

export const render = (Component) => {
  const { activeElement } = document;
  const node = Component();
  document.body.replaceChildren(node);
  activeElement.focus();
};

export const button = createNativeComponent("button");
export const div = createNativeComponent("div");
export const img = createNativeComponent("img");
export const input = createNativeComponent("input");
export const p = createNativeComponent("p");
