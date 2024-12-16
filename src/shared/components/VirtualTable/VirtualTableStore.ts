import { makeAutoObservable } from "mobx";
import { Column, TableQuery } from "./types";
import { UseQueryResult } from "@tanstack/react-query";

type VirtualTableStoreOptions<T extends TableQuery> = {
  take?: number;
  columns: Column<T>[];
  query: UseQueryResult<T, Error> | null;
};

export default class VirtualTableStore<T extends TableQuery> {
  take = 50;
  private cursor: string | null = null;
  columns: Column<T>[] = [];
  query: UseQueryResult<T, Error> | null;

  constructor(options: VirtualTableStoreOptions<T>) {
    makeAutoObservable(this);
    this.take = options.take ?? 50;
    this.columns = options.columns;
    this.query = options.query;
  }

  loadMore = () => {
    this.cursor = this.query?.data?.edges?.at(-1)?.cursor ?? null;
  };
}
