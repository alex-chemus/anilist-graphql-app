import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { Connection, DataModel, DocumentQuery } from "./types";
import { useQuery } from "@tanstack/react-query";
import { gqlClient } from "@/api";
import { Exact, InputMaybe, Scalars } from "@/api/graphql/graphql";
import { useState } from "react";

interface Props<D extends DataModel, Q extends DocumentQuery<D>> {
  queryKey: string;
  document: TypedDocumentNode<
    Q,
    Exact<{
      after?: InputMaybe<Scalars["String"]["input"]>;
      first: Scalars["Int"]["input"];
    }>
  >;
  select: (r: Q) => Connection<D> | undefined | null;
}

export default function useVirtualTable2Query<
  D extends DataModel,
  Q extends DocumentQuery<D>,
>({ queryKey, document, select }: Props<D, Q>) {
  const [take, setTake] = useState(10);
  const [cursor, setCursor] = useState<string | null>(null);

  const loadMore = () => {
    setCursor(query.data?.edges?.at(-1)?.cursor ?? null);
  };

  const query = useQuery({
    queryKey: [queryKey, take, cursor],
    queryFn: () => gqlClient.request(document, { after: cursor, first: take }),
    select,
  });

  return { ...query, loadMore };
}
