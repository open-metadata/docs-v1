export const inlineCallout = {
  render: "InlineCallout",
  attributes: {
    icon: { type: String },
    bold: { type: String },
    href: { type: String },
    isExternalLink: {
      type: Boolean,
      description:
        "Pass true if the provided href points to an external web page",
    },
  },
};
