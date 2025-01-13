import { Column, DataModel } from "../types";

interface CellRenderProps<D extends DataModel> {
  record: D;
  column: Column<D>;
}

export default function CellRender<D extends DataModel>({
  record,
  column,
}: CellRenderProps<D>) {
  if (column.render) {
    return column.render(record);
  }

  const value = record[column.key];

  if (typeof value !== "object") {
    return value;
  }

  return JSON.stringify(value);
}
