export const fence = {
  render: "Code",
  attributes: {
    content: { type: String },
    language: {
      type: String,
      description:
        "The programming language of the code block. Place it after the backticks.",
    },
    srNumber: {
      type: Number,
      description:
        "The code number, to highlight the code when the codeInfo container of the same srNumber is selected.",
    },
    isCodeBlock: {
      type: Boolean,
      default: false,
      description:
        "To determine if the code is used inside a 'codeBlock'. Must set true if used inside a 'codeBlock' tag without srNumber. This is essential for the copy to clipboard functionality to work with accurate indentations for the code inside the 'codeBlock'.",
    },
  },
};
