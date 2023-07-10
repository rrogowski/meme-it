export const createState = (initialState = {}) => {
  return {
    ...initialState,
    get canCaption() {
      const { captions, isHost, name } = this;
      const authors = captions.map(({ author }) => author);
      return !isHost && !authors.includes(name);
    },
    get canDecide() {
      const { captions } = this;
      return captions.every(({ wasViewed }) => wasViewed);
    },
    get canReveal() {
      const { captions, names, uploader } = this;
      const authors = captions.map(({ author }) => author);
      return names
        .filter((name) => name !== uploader)
        .every((name) => authors.includes(name));
    },
    get caption() {
      const { captions, index } = this;
      return captions[index];
    },
    get hasNextCaption() {
      const { captions, index } = this;
      return index < captions.length - 1;
    },
    get hasPrevCaption() {
      const { index } = this;
      return index > 0;
    },
    get isCaptionInvalid() {
      const { bottomText, topText } = this;
      return !bottomText && !topText;
    },
    get isHost() {
      const { name } = this;
      return !name;
    },
    get isUploader() {
      const { name, uploader } = this;
      return name === uploader;
    },
    get pendingAuthors() {
      const { captions, names, uploader } = this;
      const authors = captions.map(({ author }) => author);
      return names
        .filter((name) => name !== uploader)
        .filter((name) => !authors.includes(name));
    },
  };
};
