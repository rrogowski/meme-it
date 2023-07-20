import { selectWinner } from "../http.js";
import { getState } from "../store.js";
import { button, div } from "../ui.js";
import { Meme } from "./meme.js";

export const CzarRevealMemes = () => {
  const { captions, src } = getState();
  return div(
    { className: "page" },
    div(
      { className: "scroll-gallery" },
      ...captions.map((caption) => {
        const onclick = () => selectWinner(caption.author);
        return div(
          { className: "option" },
          Meme({ ...caption, src }),
          button({ onclick }, "Select Winner")
        );
      })
    )
  );
};
