import { useParams } from "react-router-dom";
import useStudiosList from "./api/useStudiosList";
import { useState } from "react";
import { StudioSort } from "@/api/graphql/graphql";
import { AssembledSelect } from "@/shared/ui/select";
import { capitalizeFirstLetter } from "@/shared/utils/string-utils";
import { Virtuoso } from "react-virtuoso";
import { ListCard } from "@/shared/ui/card";
import { getListHeight } from "@/shared/utils/list-utils";
import { Badge } from "@/shared/ui/badge";

export default function StudiosList() {
  const { id } = useParams();
  const [sort, setSort] = useState<StudioSort>(StudioSort.Id);

  const { data } = useStudiosList(Number(id), sort);

  return (
    <>
      <AssembledSelect
        items={Object.values(StudioSort)}
        itemRender={(sortKey) =>
          capitalizeFirstLetter(sortKey.split("_").join(" "))
        }
        value={sort}
        onValueChange={(value) => setSort(value as StudioSort)}
        className="mb-3 flex-grow"
      />
      <Virtuoso
        data={data ?? []}
        style={{
          height: getListHeight(data?.length),
        }}
        itemContent={(_, item) => (
          <ListCard key={item?.id} className="flex gap-1">
            <span>{item?.name}</span>
            {item?.isAnimationStudio ? <Badge>animation</Badge> : null}
          </ListCard>
        )}
      />
    </>
  );
}
