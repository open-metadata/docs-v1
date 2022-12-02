export const getDivIndexFromId = (id: string) => {
  return Number(id.split("-").reverse()[0]);
};
