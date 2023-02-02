import { useDocVersionContext } from "../context/DocVersionContext";

export const getDivIndexFromId = (id: string) => {
  return Number(id.split("-").reverse()[0]);
};

export const generateIdFromHeading = (heading: string) => {
  return heading.toLowerCase().replaceAll(" ", "-");
};

export const getUrlWithVersion = (url: string) => {
  const { docVersion } = useDocVersionContext();

  return `/${docVersion}${url}`;
};
