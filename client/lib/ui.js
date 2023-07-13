// `img` elements are cached to prevent repainting.
// `input elements are cached to prevent blurring.
const CACHEABLE_TAG_NAMES = ["img", "input"];

const createNativeComponent = (tagName) => {
  return (...args) => {
    const attributes = args.find(isAttributes);
    const children = args.filter(isChildNode);

    const element = document.createElement(tagName);
    Object.assign(element, attributes);
    element.replaceChildren(...children);

    if (!CACHEABLE_TAG_NAMES.includes(tagName)) {
      return element;
    }

    const elementsOnPage = document.querySelectorAll(tagName);
    const isEqualNode = element.isEqualNode.bind(element);
    const cachedElement = Array.from(elementsOnPage).find(isEqualNode);
    return cachedElement ?? element;
  };
};

export const button = createNativeComponent("button");
export const div = createNativeComponent("div");
export const img = createNativeComponent("img");
export const input = createNativeComponent("input");
export const p = createNativeComponent("p");

export const render = (Component) => {
  const { activeElement } = document;
  const node = Component();
  document.body.replaceChildren(node);
  activeElement.focus();
};

const isAttributes = (arg) => {
  return typeof arg === "object" && !(arg instanceof HTMLElement);
};

const isChildNode = (arg) => {
  return arg instanceof HTMLElement || typeof arg === "string";
};
