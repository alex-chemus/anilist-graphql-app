import { Scalars } from "@/api/graphql/graphql";

export type DataModel = {
  [key: string]: Scalars[keyof Scalars]["output"] | null;
};

export type Connection<D extends DataModel> = {
  edges?:
    | ({
        cursor: string;
        node?: D | null;
      } | null)[]
    | null;
};

export type DocumentQuery<D extends DataModel> = {
  [key: string]: Connection<D> | "Root" | null;
};

export type Column<D extends DataModel> = {
  title: string;
  field: keyof D;
};
