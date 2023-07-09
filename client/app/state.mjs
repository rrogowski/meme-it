export const createState = (initialState = {}) => {
  return {
    ...initialState,
    get canCaption() {
      const { captions, name } = this;
      const authors = captions.map(({ author }) => author);
      return !authors.includes(name);
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
    // get areCaptionsPending() {
    //   const { captions, names, uploader } = this;
    //   const authors = captions.map(({ author }) => author);
    //   return;
    // },
    // get captioners() {
    //   const { captions } = this;
    //   return captions.map(({ author }) => author);
    // },
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
    // get namesPendingCaption() {
    //   const { captions, names, uploader } = this;
    //   const authors =
    //     return names
    //       .filter((name) => name !== uploader)
    //       .filter((name) => !captioners.includes(name));
    // },
    // get isValidCaption() {
    //   const { bottomText, topText } = this;
    //   return bottomText || topText;
    // },
    get pendingAuthors() {
      const { captions, names, uploader } = this;
      const authors = captions.map(({ author }) => author);
      return names
        .filter((name) => name !== uploader)
        .filter((name) => !authors.includes(name));
    },
    // get unviewedCaptions() {
    //   const { captions } = this;
    //   return captions.filter(({ wasViewed }) => !wasViewed);
    // },
  };
};
