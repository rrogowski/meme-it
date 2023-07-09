import { readFileAsDataURL } from "../lib/file.js";
import { createState } from "../lib/state.js";

export const client = createState({
  caption: { bottomText: "", topText: "" },
  name: "",
  get isHost() {
    return !client.state.name;
  },
});

client.actions = {
  openFileDialog() {
    const fileInput = document.querySelector("input[type=file]");
    const event = new MouseEvent("click");
    fileInput.dispatchEvent(event);
  },
  setBottomText(event) {
    const caption = { ...client.state.caption, bottomText: event.target.value };
    client.setState({ caption });
  },
  setName(event) {
    client.setState({ name: event.target.value });
  },
  setPreview(event) {
    const file = event.target.files[0];
    readFileAsDataURL(file, (result) => {
      client.setState({ preview: result });
    });
  },
  setTopText(event) {
    const caption = { ...client.state.caption, topText: event.target.value };
    client.setState({ caption });
  },
};
