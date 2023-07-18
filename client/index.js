import { dispatch, subscribe } from "./store.js";
import { render } from "./ui.js";
import { HostCaptionImage } from "./views/host-caption-image.js";

subscribe(() => render(HostCaptionImage));
dispatch({ type: "SERVER_SYNCED", payload: { src: "portrait.jpeg" } });
