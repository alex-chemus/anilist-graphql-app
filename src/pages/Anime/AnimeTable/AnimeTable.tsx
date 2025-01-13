import { gql } from "@/api";
import { AnimeTableQuery } from "@/api/graphql/graphql";
import { Link } from "@/shared/ui/link";
import { ExtractColumns, PageTable } from "@/shared/components/PageTable";
import { CardPage } from "@/shared/ui/card";
import { renderTitle } from "@/shared/utils/renderTitle";
import { capitalizeFirstLetter } from "@/shared/utils/string-utils";
import { Skeleton } from "@/shared/ui/skeleton";

const animeTableDocument = gql(`
  query AnimeTable($page: Int!, $perPage: Int!, $search: String) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        currentPage
        hasNextPage
      }
      rows: media(isAdult: false, search: $search) {
        id
        title {
          ...TitleFragment
        }
        coverImage {
          medium
        }
        seasonYear
        status
        episodes
        averageScore
      }
    }
  }  
`);

const columns: ExtractColumns<AnimeTableQuery> = [
  {
    key: "coverImage",
    title: "",
    render: ({ coverImage }) =>
      coverImage?.medium ? (
        <img
          src={coverImage?.medium}
          className="h-[75px] w-[50px] rounded-sm object-cover"
        />
      ) : (
        <Skeleton className="h-[75px] w-[50px]" />
      ),
    width: 50,
  },
  {
    title: "Title",
    key: "title",
    render: ({ id, title }) => <Link to={`./${id}`}>{renderTitle(title)}</Link>,
    width: 450,
  },
  {
    key: "status",
    title: "Status",
    render: ({ status }) =>
      capitalizeFirstLetter((status ?? "").split("_").join(" ")),
  },
  {
    key: "seasonYear",
    title: "Started",
  },
  {
    key: "episodes",
    title: "Episodes",
  },
  {
    key: "averageScore",
    title: "Rating",
    render: ({ averageScore }) => (
      <span>
        <span className="text-indigo-500">{averageScore}</span>/100
      </span>
    ),
  },
];

export default function AnimeTable() {
  return (
    <CardPage className="flex flex-col">
      <PageTable
        queryKey="animeList"
        document={animeTableDocument}
        columns={columns}
      />
    </CardPage>
  );
}
