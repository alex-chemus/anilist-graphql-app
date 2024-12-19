import { Virtuoso } from "react-virtuoso";
import { Column, DataModel } from "./types";
import useVirtualTable2Query from "./useVirtualTable2Query";
import { Key } from "react";

interface Props<D extends DataModel> {
  query: ReturnType<typeof useVirtualTable2Query>;
  columns: Column<D>[];
}

export default function VirtualTable2<D extends DataModel>({
  query,
  columns,
}: Props<D>) {
  return (
    <Virtuoso
      style={{ height: 300 }}
      data={query.data?.edges?.map((edge) => edge?.node)}
      itemContent={(index, item) => (
        <div key={index}>
          {columns.map((column) => (
            <div key={column.field as Key}>
              <div>{column.title}</div>
              {item ? item[column.field] : null}
            </div>
          ))}
        </div>
      )}
    />
  );
}
