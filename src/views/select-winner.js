import { nextCaption, previousCaption } from "../api/http.js";
import { button, div, img, p } from "../lib/ui.js";

export const SelectWinner = ({ client, server }) => {
  const { isHost, name } = client;
  const { captions, index, src, uploader } = server;

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
    button("Back", { disabled: index === 0, onclick: goBack }),
    button("Next", { disabled: index === captions.length - 1, onclick: next })
    // img({ src })
    // p(caption.top),
    // p(caption.bottom),
  );
};
