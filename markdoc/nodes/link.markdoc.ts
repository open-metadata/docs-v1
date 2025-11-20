import {Tag} from "@markdoc/markdoc";
import {getFormattedId} from "../../utils/CommonUtils";

// List of internal domain hosts that should have their fragments processed
const INTERNAL_HOSTS = [
  "localhost",
  "open-metadata.org",
  "getcollate.io",
  "netlify.app"
];

// Helper function to check if a URL is internal
const isInternalLink = (url: string): boolean => {
  try {
    const hostname = new URL(url).hostname;
    return INTERNAL_HOSTS.some(host =>
      hostname === host || hostname.endsWith(`.${host}`)
    );
  } catch {
    // If parsing fails, it's likely a relative URL (internal)
    return true;
  }
};

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

      // Only process fragments for internal links
      if (fragment?.length > 1) {
          if (isInternalLink(url)) {
              fragment = getFormattedId([fragment]);
          }
          url += "#" + fragment;
      }

      return new Tag(this.render, { ...attributes, href: url }, children);
  },
};
