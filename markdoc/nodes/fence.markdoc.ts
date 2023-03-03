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
    },
  },
};
