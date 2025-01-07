import { LIST_CARD_HEIGHT, LIST_CARD_MB } from "../constants";

export const getListHeight = (length?: number) => {
  if (!length) return 500;
  const listHeight = length * LIST_CARD_HEIGHT + (length - 1) * LIST_CARD_MB;
  return Math.min(listHeight, 500);
};
