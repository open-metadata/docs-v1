export const codeWithLanguageSelector = {
  render: "CodeWithLanguageSelector",
  description:
    "A tag to display specific code snippets with the selected language from the given language options.",
  attributes: {
    title: {
      type: String,
      description: "Title to show for the language selector component.",
    },
    languagesArray: {
      type: Array<string>,
      description:
        "An array of languages to show the tabs for selection of language.",
    },
    id: {
      type: String,
      description:
        "Id should be unique for all the 'codeWithLanguageSelector' tags in a single page.",
    },
    theme: {
      type: String,
      description: "Attribute to choose the color theme for the code block.",
      matches: ["gray", "light"],
      default: "default",
    },
  },
};
