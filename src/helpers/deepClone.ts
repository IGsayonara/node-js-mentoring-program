export const deepClone = (obj: any): typeof obj => {
  return JSON.parse(JSON.stringify(obj));
};
