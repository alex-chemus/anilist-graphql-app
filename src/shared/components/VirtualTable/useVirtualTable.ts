import { useQuery } from "@tanstack/react-query";
import { TableQuery } from "./types";
import { gqlClient } from "@/api";
import { Exact, InputMaybe, Scalars } from "@/api/graphql/graphql";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { useState } from "react";

interface UseVirtualTableProps<DocumentQuery> {
  queryKey: string;
  document: TypedDocumentNode<
    DocumentQuery,
    Exact<{
      after?: InputMaybe<Scalars["String"]["input"]>;
      first: Scalars["Int"]["input"];
    }>
  >;
  select: (r: DocumentQuery) => TableQuery;
}

export default function useVirtualTable<DocumentQuery>({
  queryKey,
  document,
  select,
}: UseVirtualTableProps<DocumentQuery>) {
  // при наличии сортировки, фильтрации и др. фич удобнее было бы использовать стор
  // но в данном случае это лишнее усложнение
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

  return { query, loadMore };
}
