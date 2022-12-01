export const getDivIndexFromId = (id: string) => {
  return id.split("-").reverse()[0];
};
