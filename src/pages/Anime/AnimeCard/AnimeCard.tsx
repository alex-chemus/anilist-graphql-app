import { useNavigate, useParams } from "react-router-dom";
import { Skeleton } from "@/shared/ui/skeleton";
import { CardPage } from "@/shared/ui/card";
import useAnime from "./api/useAnime";
import { renderTitle } from "@/shared/utils/renderTitle";
import { cn } from "@/shared/utils/cn";
import { Badge } from "@/shared/ui/badge";
import { capitalizeFirstLetter } from "@/shared/utils/string-utils";
import CharactersList from "./components/CharactersList/CharactersList";
import { ReactNode } from "react";
import { AssembledAccordion } from "@/shared/ui/accordion";
import StudiosList from "./components/StudiosList/StudiosList";

const accordionItems: [string, ReactNode][] = [
  ["Characters", <CharactersList key={1} />],
  ["Studios", <StudiosList key={2} />],
];

export default function AnimeCard() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useAnime(Number(id));

  const animeAttributes: [string, string | null | undefined | number][] = [
    [
      "Format",
      data?.format === "TV" ? "TV" : capitalizeFirstLetter(data?.format ?? ""),
    ],
    ["Status", data?.status?.toLocaleLowerCase()],
    ["Episodes", data?.episodes],
  ];

  return (
    <CardPage
      onNavigateBack={() => navigate(-1)}
      className="grid h-full grid-cols-3 gap-9"
    >
      {data?.coverImage?.extraLarge ? (
        <img
          src={data.coverImage.extraLarge}
          alt={renderTitle(data.title)}
          className={cn("rounded-md object-cover")}
        />
      ) : (
        <Skeleton className="h-2/3 max-h-[50vh]" />
      )}
      <div className="col-span-2 flex flex-col gap-4">
        <div className="mb-2">
          <h1 className="mb-2 text-xl font-semibold">
            {renderTitle(data?.title)}
          </h1>
          <div className="flex gap-1">
            {data?.genres
              ?.filter(Boolean)
              .map((genre) => <Badge key={genre}>{genre}</Badge>)}
          </div>
        </div>
        <p>{data?.description}</p>
        {animeAttributes.map(([title, value]) =>
          value ? (
            <p key={title}>
              <span className="font-semibold">{title}: </span>
              {value}
            </p>
          ) : null,
        )}
        <p className="font-semibold">
          <span>Score: </span>
          <span className="text-2xl text-indigo-500">{data?.averageScore}</span>
          <span>/100</span>
        </p>
        <AssembledAccordion items={accordionItems} />
      </div>
    </CardPage>
  );
}
