export const link = {
  render: "CustomAnchorNode",
  attributes: {
    href: { type: String },
    isExternalLink: {
      type: Boolean,
      description:
        "Pass true if the provided href points to an external web page",
    },
  },
};
