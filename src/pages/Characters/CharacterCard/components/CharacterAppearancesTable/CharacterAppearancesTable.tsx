import { MediaSort } from "@/api/graphql/graphql";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useCharacterAppearances from "./api/useCharacterAppearances";
import { AssembledSelect } from "@/shared/ui/select";
import { capitalizeFirstLetter } from "@/shared/utils/string-utils";
import { Virtuoso } from "react-virtuoso";
import { getListHeight } from "@/shared/utils/list-utils";
import { ListCard } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { Link } from "@/shared/ui/link";
import { renderTitle } from "@/shared/utils/renderTitle";
import { Badge } from "@/shared/ui/badge";
import { INCREASE_VIEWPORT } from "@/shared/constants";

export default function CharacterAppearancesTable() {
  const { id } = useParams();

  const [sort, setSort] = useState<MediaSort>(MediaSort.Id);

  const { data, fetchNextPage } = useCharacterAppearances(Number(id), sort);

  return (
    <div>
      <div className="flex items-baseline gap-2">
        <div>Sort</div>
        <AssembledSelect
          items={Object.values(MediaSort)}
          onValueChange={(value) => setSort(value as MediaSort)}
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
            {item?.coverImage?.medium ? (
              <img
                src={item.coverImage.medium}
                className="h-full w-8 object-cover"
              />
            ) : (
              <Skeleton className="h-full w-8 bg-zinc-50" />
            )}
            <Link to={`/anime/${item?.id}`}>{renderTitle(item?.title)}</Link>
            {item?.status ? (
              <Badge>
                {capitalizeFirstLetter(item.status.split("_").join(" "))}
              </Badge>
            ) : null}
          </ListCard>
        )}
        endReached={() => fetchNextPage()}
      />
    </div>
  );
}
