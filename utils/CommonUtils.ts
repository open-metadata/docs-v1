export const getDivIndexFromId = (id: string) => {
  return Number(id.split("-").reverse()[0]);
};

export const generateIdFromHeading = (heading: string) => {
  return heading.toLowerCase().replaceAll(" ", "-");
};
