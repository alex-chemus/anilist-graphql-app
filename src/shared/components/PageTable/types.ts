import { ReactNode } from "react";
import { Exact, InputMaybe, Scalars } from "@/api/graphql/graphql";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";

export type DataModel = {
  [key: string]:
    | Scalars[keyof Scalars]["output"]
    | DataModel
    | null
    | undefined;
};

export type DocumentQuery<D extends DataModel> = {
  __typename?: "Query";
  Page?: {
    __typename?: "Page";
    pageInfo?: {
      __typename?: "PageInfo";
      currentPage?: number | null;
      hasNextPage?: boolean | null;
    } | null;
    rows?: Array<D | null> | null;
  } | null;
};

export type Column<D extends DataModel> = {
  title: string;
  key: keyof D;
  render?: (value: D) => ReactNode;
  width?: number;
};

type ExtractDataModel<D extends DocumentQuery<object>> = Omit<
  NonNullable<NonNullable<NonNullable<D["Page"]>["rows"]>[number]>,
  "__typename"
>;

export type ExtractColumns<D extends DocumentQuery<object>> = Column<
  ExtractDataModel<D>
>[];

export interface PageTableProps<D extends DataModel> {
  queryKey: string;
  document: TypedDocumentNode<
    DocumentQuery<D>,
    Exact<{
      page: Scalars["Int"]["input"];
      perPage: Scalars["Int"]["input"];
      search: InputMaybe<Scalars["String"]["input"]>;
    }>
  >;
  columns: Column<D>[];
}
