import { CharacterSort } from "@/api/graphql/graphql";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useCharactersList from "./api/useCharactersList";
import { Virtuoso } from "react-virtuoso";
import { ListCard } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { AssembledSelect } from "@/shared/ui/select";
import { capitalizeFirstLetter } from "@/shared/utils/string-utils";
import { getListHeight } from "@/shared/utils/list-utils";
import { Link } from "@/shared/ui/link";
import { INCREASE_VIEWPORT } from "@/shared/constants";

export default function CharactersList() {
  const { id } = useParams();

  const [sort, setSort] = useState(CharacterSort.Id);

  const { data, fetchNextPage } = useCharactersList(Number(id), sort);

  return (
    <div>
      <div className="flex items-baseline gap-2">
        <div>Sort</div>
        <AssembledSelect
          items={Object.values(CharacterSort)}
          onValueChange={(value) => setSort(value as CharacterSort)}
          value={sort}
          itemRender={(sortKey) =>
            capitalizeFirstLetter(sortKey.split("_").join(" "))
          }
          className="mb-3 flex-grow"
        />
      </div>
      <Virtuoso
        style={{ height: getListHeight(data?.length) }}
        data={data ?? []}
        increaseViewportBy={INCREASE_VIEWPORT}
        itemContent={(_, item) => (
          <ListCard>
            {item?.image?.medium ? (
              <img
                src={item?.image?.medium ?? ""}
                className="h-full w-8 object-cover"
                alt={item.name?.full ?? ""}
              />
            ) : (
              <Skeleton className="h-full w-8 bg-zinc-50" />
            )}
            <Link to={`/characters/${item?.id}`}>{item?.name?.full}</Link>
          </ListCard>
        )}
        endReached={() => fetchNextPage()}
      />
    </div>
  );
}
