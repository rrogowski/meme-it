import { div, img, p } from "../lib/ui.js";

export const Meme = ({ bottomText, src, topText }) => {
  return div(
    { className: "meme" },
    div(
      { className: "vertical-align" },
      div(
        { className: "vertical-boundary" },
        img({
          className: "vertically-bounded-image",
          key: "vertically-bounded-image",
          src,
        }),
        div(
          { className: "vertically-bounded-container" },
          div(
            { className: "horizontal-align" },
            img({
              className: "horizontally-bounded-image",
              key: "horizontally-bounded-image",
              src,
            }),
            p(topText),
            p(bottomText)
          )
        )
      )
    )
  );
};

// HACK: As far as I can tell, there is NOT a straightforward way to fit an
// arbitrarily sized image to an arbitrarily sized container WITHOUT losing
// aspect ratio AND without the image container taking up the entire width
// and height of the parent container. In order to show top and bottom text
// on top of the image, I need a way to create a container that is exactly
// the width and height of the resulting auto-sized image.
const AutoSizingImageContainer = ({ src }, ...children) => {
  return div(
    { style: `display: flex; flex-direction: column; position: relative` },
    img({ src, style: "opacity: 0;" }),
    div(
      { className: "height-bounding-container" },
      div({ className: "width-bounding-container" }, ...children)
    )
  );
};
