import InlineCallout from "../../components/common/InlineCallout/InlineCallout";

export const inlineCallout = {
  render: InlineCallout,
  attributes: {
    color: { type: String },
    icon: { type: String },
    bold: { type: String },
    href: { type: String },
  },
};
