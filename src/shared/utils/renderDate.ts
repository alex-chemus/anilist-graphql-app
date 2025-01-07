import { FuzzyDate } from "@/api/graphql/graphql";

// todo: мб заменить на dayjs
export const renderDate = (date?: FuzzyDate | null) => {
  const dateArray = [
    `${date?.day}`.length === 1 ? `0${date?.day}` : date?.day,
    `${date?.month}`.length === 1 ? `0${date?.month}` : date?.day,
    date?.year,
  ].filter(Boolean);
  return dateArray.length > 0 ? dateArray.join(".") : "???";
};
