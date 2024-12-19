import { Scalars } from "@/api/graphql/graphql";

type Column<M extends Model> = {
  title: string;
  field: keyof M;
};

type Model = {
  [key: string]: Scalars[keyof Scalars]["output"];
};
