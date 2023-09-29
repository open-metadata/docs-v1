export const tile = {
  render: "Tile",
  description:
    "A better way to show links of other pages in the docs with some description about the page",
  attributes: {
    description: {
      type: String,
    },
    icon: {
      type: String,
      description: `Name of the custom icon (administration | collaboration | discovery | governance | quality). 
        Or the identifier string to render the icons from 'Material Icons'. 
        Visit https://react-icons.github.io/react-icons/icons?name=md to checkout the available icon`,
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
