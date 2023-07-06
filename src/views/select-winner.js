import { nextCaption, previousCaption } from "../api/http.js";
import { button, div, img, input, p } from "../lib/ui.js";

export const SelectWinner = ({ client, server }) => {
  const { didConfirm, isHost, name } = client;
  const { canVote, captions, index, src, uploader } = server;

  const caption = captions[index];
  if (isHost) {
    return div(img({ src }), p(caption.top), p(caption.bottom));
  }

  if (name !== uploader) {
    return `Waiting for ${uploader} to select a winner`;
  }

  const goBack = () => {
    previousCaption();
  };

  const next = () => {
    nextCaption();
  };

  return div(
    img({ src: IMAGE_SRC_URL }),
    p(caption.top),
    p(caption.bottom),
    button("Back", { disabled: index === 0, onclick: goBack }),
    button("Next", { disabled: index === captions.length - 1, onclick: next }),
    canVote
      ? div(
          input({ type: "checkbox", value: didConfirm }),
          p("Certified Dank Meme")
        )
      : null
  );
};
