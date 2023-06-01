export const codeBlock = {
  render: "CodeBlock",
  attributes: {
    fileName: {
      type: String,
      description:
        "An optional field to show name of the file where the given code is supposed to be",
    },
    theme: {
      type: String,
      description: "Attribute to choose the color theme for the code block.",
      matches: ["gray", "light"],
      default: "default",
    },
  },
};
