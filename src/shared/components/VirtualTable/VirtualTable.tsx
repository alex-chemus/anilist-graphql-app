import { Virtuoso } from "react-virtuoso";
import useVirtualTable from "./useVirtualTable";
import { Column, Model, TableQuery } from "./types";
import { Key, ReactNode } from "react";

interface VirtualTableProps<T extends TableQuery>
  extends ReturnType<typeof useVirtualTable> {
  columns: Column<T>[];
}

export default function VirtualTable<T extends TableQuery>({
  query,
  loadMore,
  columns,
}: VirtualTableProps<T>) {
  return (
    <Virtuoso
      style={{ height: 300 }}
      data={query.data?.edges?.map((edge) => edge?.node as Model<T>) ?? []}
      endReached={loadMore}
      itemContent={(_, item) => (
        <div>
          {columns.map((column) => (
            <div key={column.field as Key}>
              <div>{column.title}</div>
              {item ? ([column.field] as ReactNode) : null}
            </div>
          ))}
        </div>
      )}
    />
  );
}
