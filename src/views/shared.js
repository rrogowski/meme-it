import { div, img, p } from "../lib/ui.js";

export const MemeOg = ({ bottomText, src, topText }) => {
  return div(
    {
      style:
        "display: flex; flex-direction: column; height: 100vh; align-items: center",
    },
    div(
      {
        style:
          "background-color: red; overflow: hidden; display: flex; position: relative; justify-content: center",
      },
      div(
        { style: "position: relative" },
        img({ src, style: "max-width: 100%; max-height: 100%" }),
        div(
          {
            style:
              "container-type: size; height: 100%; width: 100%; position: absolute; top: 0",
          },
          p(
            p(
              {
                className: "top-text",
                style:
                  "color: white; position: absolute; top: 0; font-size: 10cqh",
              },
              topText
            ),
            p(
              {
                className: "bottom-text",
                style:
                  "color: white; position: absolute; bottom: 0; font-size: 10cqh",
              },
              bottomText
            )
          )
        )
      )
      // { style: "display: flex" }
      // img({ src, style: "max-height: 100vh; max-width: 100vw" })
    ),
    div(
      { style: "background-color: blue; flex-grow: 1" },
      p("More content"),
      p("More content"),
      p("More content"),
      p("More content"),
      p("More content")
    )
    // div(
    //   { style: "display: flex; flex-direction: column" },
    //   div(
    //     { style: "display: flex" },

    //   )

    // p({  }, bottomText)
    // )
    // div({ style: "background-color: blue" }, p("other text"))
  );
};

const CONTAINER_STYLE =
  "align-items: center; display: flex; flex-direction: column; height: 100vh";

const TOP_STYLE =
  "background-color: red; overflow: hidden; display: flex; position: relative; justify-content: center; min-height: 300px; min-width: 300px";

const BOTTOM_STYLE = "background-color: blue; flex-grow: 1";

export const Meme = ({ bottomText, src, topText }) => {
  return div(
    { className: "meme" },
    img({ src }),
    div({ className: "caption" }, p(topText), p(bottomText))
  );
};
