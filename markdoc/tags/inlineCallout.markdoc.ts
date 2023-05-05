export const inlineCallout = {
  render: "InlineCallout",
  attributes: {
    icon: {
      type: String,
      description: `The identifier string to render the icons from 'Material Icons'. 
        Visit https://react-icons.github.io/react-icons/icons?name=md to checkout the available icon`,
    },
    bold: { type: String },
    href: { type: String },
    isExternalLink: {
      type: Boolean,
      description:
        "Pass true if the provided href points to an external web page",
    },
  },
};
