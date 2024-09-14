// Separate thousands by comma
export const deriveNumTag = (num: number, flag?: string) => {
  let result = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  if(flag) result += " " + flag;
  return result;
};