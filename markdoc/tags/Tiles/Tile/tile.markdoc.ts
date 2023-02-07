export const tile = {
  render: "Tile",
  description:
    "A better way to show links of other pages in the docs with some description about the page",
  attributes: {
    description: {
      type: String,
    },
    link: {
      type: String,
    },
    title: {
      type: String,
    },
    isExternalLink: {
      type: Boolean,
      description:
        "Pass true if the provided link points to an external web page",
    },
  },
};
