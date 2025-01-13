export const capitalizeFirstLetter = (str: string) =>
  str.split("")[0].toUpperCase() + str.slice(1).toLocaleLowerCase();

export const booleanFromString = (str: string) =>
  str.toLocaleLowerCase() === "true";
