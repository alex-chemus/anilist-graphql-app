import { TableVirtuoso } from "react-virtuoso";
import { DataModel, PageTableProps } from "./types";
import { Key, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { gqlClient } from "@/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import CellRender from "./CellRender/CellRender";
import { DEFAULT_PER_PAGE } from "@/shared/constants";
import { Input } from "@/shared/ui/input";
import { Skeleton } from "@/shared/ui/skeleton";

export default function PageTable<D extends DataModel>({
  queryKey,
  document,
  columns,
}: PageTableProps<D>) {
  const [perPage] = useState(DEFAULT_PER_PAGE);
  const [search, setSearch] = useState<string | null>(null);

  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: [queryKey, perPage, search],
    queryFn: async ({ pageParam: page, signal }) =>
      gqlClient.request({
        document,
        variables: { page, perPage, search },
        signal,
      }),
    initialPageParam: 1,
    getNextPageParam: (_, __, lastPage) => lastPage + 1,
    select: (data) =>
      data.pages.reduce(
        (acc, page) => [...acc, ...(page.Page?.rows ?? [])],
        [] as (D | null)[],
      ),
  });

  return (
    <div className="flex flex-grow flex-col gap-3">
      <Input
        placeholder="Search"
        value={search ?? ""}
        onChange={(e) => setSearch(e.target.value || null)}
      />
      {data ? (
        <TableVirtuoso
          components={{
            Table,
            TableHead: TableHeader,
            TableBody,
            TableRow,
          }}
          style={{ height: "100%", flexGrow: 1 }}
          fixedHeaderContent={() => (
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={column.key as Key}
                  style={{ width: column.width, boxSizing: "content-box" }}
                >
                  {column.title}
                </TableHead>
              ))}
            </TableRow>
          )}
          data={data}
          itemContent={(_, record) => (
            <>
              {columns.map((column) => (
                <TableCell key={column.key as Key}>
                  {record && column.key in record ? (
                    <CellRender record={record} column={column} />
                  ) : null}
                </TableCell>
              ))}
            </>
          )}
          endReached={() => fetchNextPage()}
        />
      ) : (
        <Skeleton className="flex-grow" />
      )}
    </div>
  );
}
