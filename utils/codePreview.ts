export const getCodeDivIndexFromId = (id: string) => {
  return id.split("-").reverse()[0];
};
