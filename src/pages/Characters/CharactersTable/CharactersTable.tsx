import { gql } from "@/api";
import { CharactersTableQuery } from "@/api/graphql/graphql";
import { ExtractColumns, PageTable } from "@/shared/components/PageTable";
import { BadgeButton } from "@/shared/ui/button";
import { CardPage } from "@/shared/ui/card";
import { Link } from "@/shared/ui/link";
import { Skeleton } from "@/shared/ui/skeleton";
import { cn } from "@/shared/utils/cn";
import { renderTitle } from "@/shared/utils/renderTitle";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

const charactersTableDocument = gql(`
  query CharactersTable($page: Int!, $perPage: Int!, $search: String) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        currentPage
        hasNextPage
      }
      rows: characters(search: $search) {
        id
        name {
          full
        }
        image {
          medium
        }
        gender
        media(page: 1, perPage: 4, type: ANIME) {
          nodes {
            id
            title {
              ...TitleFragment
            }
          }
        }
      }
    }
  }
`);

export default function CharactersTable() {
  const navigate = useNavigate();

  const columns = useMemo<ExtractColumns<CharactersTableQuery>>(
    () => [
      {
        key: "image",
        title: "",
        render: ({ image }) =>
          image?.medium ? (
            <img
              src={image?.medium}
              className="h-[75px] w-[50px] rounded-sm object-cover"
            />
          ) : (
            <Skeleton className="h-[75px] w-[50px]" />
          ),
        width: 50,
      },
      {
        key: "name",
        title: "Name",
        render: ({ name, id }) => <Link to={`./${id}`}>{name?.full}</Link>,
      },
      {
        key: "gender",
        title: "Gender",
        render: ({ gender }) => (
          <div
            className={cn({
              "text-blue-500": gender === "Male",
              "text-fuchsia-500": gender === "Female",
            })}
          >
            {gender}
          </div>
        ),
      },
      {
        key: "media",
        title: "Anime",
        render: ({ media, id }) => (
          <div className="flex flex-wrap gap-1">
            {media?.nodes?.slice(0, 3).map((anime) => (
              <BadgeButton
                key={anime?.id}
                className="whitespace-nowrap"
                onClick={() => navigate(`/anime/${anime?.id}`)}
              >
                {renderTitle(anime?.title)}
              </BadgeButton>
            ))}
            {media?.nodes?.length && media.nodes.length > 3 && (
              <BadgeButton
                className="h-auto rounded-full px-2.5 py-0.5"
                onClick={() => navigate(`${id}?appearancesOpen=true`)}
              >
                ...
              </BadgeButton>
            )}
          </div>
        ),
        width: 600,
      },
    ],
    [navigate],
  );

  return (
    <CardPage className="flex flex-col">
      <PageTable
        queryKey="charactersTable"
        document={charactersTableDocument}
        columns={columns}
      />
    </CardPage>
  );
}
