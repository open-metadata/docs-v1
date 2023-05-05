import { DEFAULT_VERSION } from "../constants/version.constants";
import * as icons from "react-icons/md";
import { startCase } from "lodash";

export const getDivIndexFromId = (id: string) => {
  return Number(id.split("-").reverse()[0]);
};

export const generateIdFromHeading = (heading: string) => {
  return heading.toLowerCase().replaceAll(" ", "-");
};

export const getUrlWithVersion = (url: string, docVersion: string) => {
  return `/${docVersion}${url}`;
};

export const getVersionFromUrl = (url: string) => {
  const versionStringArray = url.match(/(\/v(\d*\.*)*\/)/g);
  const versionString = versionStringArray ? versionStringArray[0] : undefined;
  const version = versionString ? versionString.split("/")[1] : DEFAULT_VERSION;
  return version;
};

export const fetchMenuList = async (version: string) => {
  try {
    const response = await fetch(`/api/getMenu?version=${version}`, {
      method: "GET",
    });

    const parsedResponse = await response.json();

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
  const regexToMatchMdPattern = /^Md/g;
  const prefixExits = regexToMatchMdPattern.test(icon);

  // If prefix doesn't exist, apply the prefix
  const prefix = prefixExits ? "" : `Md`;

  // Logic to fix the icon name passed with the incorrect cases or pattern
  // i.e. if passed `open_lock` or `Open lock` instead of `OpenLock`
  const iconName = startCase(icon).replaceAll(" ", "");

  const iconComponentName = `${prefix}${iconName}`;

  return icons[iconComponentName];
};
