import { MediaTitle } from "@/api/graphql/graphql";

export const renderTitle = (title?: MediaTitle | null) =>
  title?.english ?? title?.romaji ?? title?.native ?? "";
