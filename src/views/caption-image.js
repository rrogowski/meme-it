import { button, div, input, p } from "../lib/ui.js";
import { Meme } from "./meme.js";

export const CaptionImage = ({ client, server }) => {
  const { canCaption } = server.state;
  return canCaption ? EnterCaption({ client, server }) : Waiting({ server });
};

const EnterCaption = ({ client, server }) => {
  const { caption = {} } = client.state;
  const { setBottomText, setTopText } = client.actions;
  const { src } = server.state;
  const { uploadCaption } = server.actions;
  return div(
    { className: "caption-image" },
    div({ className: "preview" }, Meme({ caption, src })),
    input({
      key: "top-text",
      oninput: setTopText,
      placeholder: "Top Text",
      value: caption.topText ?? "",
    }),
    input({
      key: "bottom-text",
      oninput: setBottomText,
      placeholder: "Bottom Text",
      value: caption.bottomText ?? "",
    }),
    button("Submit", {
      disabled: !caption.topText && !caption.bottomText,
      onclick: uploadCaption,
    })
  );
};

const Waiting = ({ server }) => {
  const { pendingCaptioners } = server.state;
  return pendingCaptioners.length > 0
    ? WaitingForCaptions({ server })
    : WaitingForUploader({ server });
};

const WaitingForCaptions = ({ server }) => {
  const { pendingCaptioners } = server.state;
  return div(
    { className: "caption-image" },
    p("Waiting for all players to caption:"),
    ...pendingCaptioners.map(p)
  );
};

const WaitingForUploader = ({ server }) => {
  const { uploader } = server.state;
  return div(
    { className: "caption-image" },
    p(`Waiting for ${uploader} to reveal memes`)
  );
};
