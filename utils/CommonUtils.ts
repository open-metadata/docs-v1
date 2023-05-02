import { DEFAULT_VERSION } from "../constants/version.constants";
import { useDocVersionContext } from "../context/DocVersionContext";

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
