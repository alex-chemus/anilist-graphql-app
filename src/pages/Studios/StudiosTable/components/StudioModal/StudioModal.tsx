import { BadgeButton } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import useStudioModal from "./api/useStudioModal";
import { Virtuoso } from "react-virtuoso";
import { getListHeight } from "@/shared/utils/list-utils";
import { ListCard } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { Link } from "@/shared/ui/link";
import { renderTitle } from "@/shared/utils/renderTitle";
import { useState } from "react";
import { INCREASE_VIEWPORT } from "@/shared/constants";

interface StudioModalProps {
  id: number;
}

export default function StudioModal({ id }: StudioModalProps) {
  const [queryEnabled, setQueryEnabled] = useState(false);
  const { data } = useStudioModal(id, queryEnabled);

  return (
    <Dialog>
      <DialogTrigger>
        <BadgeButton onClick={() => setQueryEnabled(true)}>...</BadgeButton>
      </DialogTrigger>
      <DialogContent>
        {data ? (
          <>
            <DialogHeader>
              <DialogTitle>{data.name}</DialogTitle>
            </DialogHeader>
            <Virtuoso
              style={{ height: getListHeight(data.media.length) }}
              data={data.media ?? []}
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
                  <Link to={`/anime/${item?.id}`}>
                    {renderTitle(item?.title)}
                  </Link>
                </ListCard>
              )}
            />
          </>
        ) : (
          <Skeleton className="h-[500px]" />
        )}
      </DialogContent>
    </Dialog>
  );
}
