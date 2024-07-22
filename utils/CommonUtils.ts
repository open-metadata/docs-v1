import Markdoc from "@markdoc/markdoc";
import { isEmpty, startCase } from "lodash";
import * as icons from "react-icons/md";
import { HeadingObject } from "../components/PageLayouts/APIPageLayout/APIPageSideNav/APIPageSideNav";
import { DEFAULT_VERSION } from "../constants/version.constants";
import { MenuItem, UrlParams } from "../interface/common.interface";

export const getDivIndexFromId = (id: string) => {
  return Number(id.split("-").reverse()[0]);
};

export const generateIdFromHeading = (heading: string) => {
  return heading.toLowerCase().replaceAll(" ", "-");
};

export const getUrlWithVersion = (url: string, docVersion: string) => {
  return `/${docVersion}${url}`;
};

export const getUrl = ({
  url,
  docVersion,
  enableVersion,
  isExternalLink = false,
}: UrlParams) => {
  if (isExternalLink || !enableVersion) {
    return url;
  } else {
    return getUrlWithVersion(url, docVersion);
  }
};

export const getVersionFromUrl = (url: string) => {
  const versionStringArray = url.match(/v\d+\.\d+\.x/);
  const versionString = versionStringArray
    ? versionStringArray[0]
    : DEFAULT_VERSION;
  return versionString;
};

export const fetchMenuList = async (version?: string) => {
  try {
    const response = await fetch(
      version ? `/api/getMenu?version=${version}` : `/api/getMenu`,
      {
        method: "GET",
      }
    );

    const parsedResponse: Array<MenuItem> = await response.json();

    if (response.status === 200) {
      return parsedResponse;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export const materialDesignIcon = (icon: string) => {
  // Checking whether the icon name passed has prefix 'Md' applied already
  // i.e. 'MdCircle' for 'circle' icon
  // If prefix doesn't exist, apply the prefix
  // Logic to fix the icon name passed with the incorrect cases or pattern
  // i.e. if passed `open_lock` or `Open lock` instead of `OpenLock`
  let iconName = startCase(icon).replaceAll(" ", "");

  if (!/^Md/g.test(iconName)) {
    iconName = "Md" + iconName;
  }

  return icons[iconName];
};

export const getFormattedPartials = (
  partialsObject: Record<string, string>
) => {
  if (isEmpty(partialsObject)) {
    return {};
  }
  const formattedPartialsObj = {};

  Object.entries(partialsObject).forEach(([key, value]) => {
    formattedPartialsObj[key] = Markdoc.parse(value);
  });

  return formattedPartialsObj;
};

// Function to convert the flat headings array to a nested array based on hierarchy
// For example.
// input = ['h1','h2','h3','h1']
// output = [
//   {
//     level: "h1",
//     children: [{ level: "h2", children: [{ level: "h3", children: [] }] }],
//   },
//   { level: "h1", children: [] },
// ];
export const createNestedNodeStructure = (
  inputArray: HeadingObject[]
): HeadingObject[] => {
  // Initializing the root object to start as a base to compare next elements to
  const root: HeadingObject = {
    level: "",
    label: "",
    target: "",
    children: [],
  };
  const stack = [root];

  for (const element of inputArray) {
    const newNode = { ...element, children: [] };

    let parent = stack[stack.length - 1];

    // Logic to traverse to the appropriate parent positions for current element
    while (stack.length > 1 && parent.level >= element.level) {
      stack.pop();
      parent = stack[stack.length - 1];
    }

    // Adding the the current element as the children of the appropriate parent
    parent.children.push(newNode);
    // Adding the same node to keep track of the last added node to compare with the next element later
    stack.push(newNode);
  }

  return root.children;
};

// Function to generate an id text from the child node texts
export const getFormattedId = (children: Array<string | undefined>) => {
  if (isEmpty(children)) {
    return "";
  }

  // Filter the strings and form a text
  const itemText = children
    .filter((child) => typeof child === "string")
    .join(" ");

  // Remove special characters and emojis from the text
  const filteredText = itemText
    .replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
      ""
    ) // Remove all the emojis from the string
    .replace(/[?:\-()%$#/@!;,\/\\\[\]+=_]/g, ""); // remove all the special characters from the string

  return filteredText.trim().replace(/\s+/g, "-").toLowerCase();
};
