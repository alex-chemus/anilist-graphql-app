// import { TestQueryQuery } from "@/api/graphql/graphql";
// import { TypedDocumentNode } from "@graphql-typed-document-node/core";

import { AllPeopleQuery } from "@/api/graphql/graphql";

// проще импортировать тип из Graphql, просто экспериментировал
// type InferredVariables<D> =
//   D extends TypedDocumentNode<
//     {
//       [key: string]: any;
//     },
//     infer Variables
//   >
//     ? Variables
//     : never;

// type InferredQueryType<D> =
//   D extends TypedDocumentNode<infer Variables, InferredVariables<D>>
//     ? Variables
//     : never;

export type TableQuery =
  | { edges?: Array<{ cursor: string; node?: object | null } | null> | null }
  | null
  | undefined;

export type InferArray<T> =
  T extends Array<infer Item> ? NonNullable<Item> : never;

export type NodeType<Q extends TableQuery> = Omit<
  NonNullable<
    InferArray<NonNullable<Q>["edges"]> extends never
      ? never
      : InferArray<NonNullable<Q>["edges"]>
  >,
  "__typename"
>;

export type Model<Q extends TableQuery> = Omit<
  NonNullable<
    NodeType<Q> extends { node?: object | null } ? NodeType<Q>["node"] : never
  >,
  "__typename"
>;

type Test = Model<AllPeopleQuery["allPeople"]>;

export interface Column<Q extends TableQuery> {
  title: string;
  field: keyof Model<Q>;
}
