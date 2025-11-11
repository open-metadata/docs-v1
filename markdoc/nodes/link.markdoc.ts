import {Tag} from "@markdoc/markdoc";
import {getFormattedId} from "../../utils/CommonUtils";

export const link = {
  render: "CustomAnchorNode",
  attributes: {
    href: { type: String },
  },
  transform(node, config) {
      console.log("transforming", node);
      const attributes = node.transformAttributes(config);
      const children = node.transformChildren(config);

      let [url, fragment] = attributes.href.split("#");

      if (fragment?.length > 1) {
          fragment = getFormattedId([fragment]);
          url += "#" + fragment;
      }

      return new Tag(this.render, { ...attributes, href: url }, children);
  },
};
