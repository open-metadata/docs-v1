import { Tag } from "@markdoc/markdoc";
import { isEmpty, isString, toArray } from "lodash";

// Logic to extract texts from the inline nodes
// Example: # This is a `Heading`
// should have id as "This-is-a-Heading"
function getChildrenTexts(children): string[] {
  if (isEmpty(children)) {
    return [];
  }

  return toArray(children).reduce((prevValue, childNode) => {
    if (isString(childNode)) {
      return [...prevValue, childNode];
    } else if (!isEmpty(childNode.attributes)) {
      return [...prevValue, childNode.attributes.content];
    } else if (!isEmpty(childNode.children)) {
      return [...prevValue, ...getChildrenTexts(childNode.children)];
    } else {
      return;
    }
  }, []);
}

function generateID(children, attributes) {
  if (attributes.id && typeof attributes.id === "string") {
    return attributes.id;
  }
  return children
    .filter((child) => typeof child === "string")
    .join(" ")
    .replace(/[?:\-()%$#/@!;.,\/\\\[\]+=_]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase();
}

export const heading = {
  render: "Heading",
  children: ["inline"],
  attributes: {
    id: { type: String },
    level: { type: Number, required: true, default: 1 },
    className: { type: String },
    children: { type: String },
  },
  transform(node, config) {
    const attributes = node.transformAttributes(config);
    const children = node.transformChildren(config);

    const id = generateID(getChildrenTexts(children), attributes);

    return new Tag(this.render, { ...attributes, id }, children);
  },
};
