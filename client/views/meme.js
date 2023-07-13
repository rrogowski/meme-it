import { div, img, p } from "../ui.js";

// HACK: As far as I can tell, there is NOT a straightforward way to fit an
// arbitrarily sized image to an arbitrarily sized container WITHOUT losing
// aspect ratio AND without the image container taking up the entire width
// and height of the parent container. In order to show top and bottom text
// on top of the image, I need a way to create a container that is exactly
// the width and height of the resulting auto-sized image.
export const Meme = ({ bottomText, src, topText }) => {
  return div(
    { className: "meme" },
    div(
      { className: "vertical-aligner" },
      div(
        { className: "vertical-bounder" },
        img({ className: "vertically-bounded-image", src }),
        div(
          { className: "vertically-bounded-container" },
          div(
            { className: "horizontal-aligner" },
            div(
              { className: "horizontal-bounder" },
              img({ className: "horizontally-bounded-image", src }),
              div(
                { className: "horizontally-bounded-container" },
                img({ className: "fully-bounded-image", src }),
                p({ className: "top-text" }, topText),
                p({ className: "bottom-text" }, bottomText)
              )
            )
          )
        )
      )
    )
  );
};
