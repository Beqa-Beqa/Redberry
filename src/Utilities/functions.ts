// Separate thousands by comma
export const deriveNumTag = (num: number, flag: string) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " " + flag;