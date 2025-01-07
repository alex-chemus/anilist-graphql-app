import { gql } from "@/api";
import { CharactersListQuery } from "@/api/graphql/graphql";
import { ExtractColumns, PageTable } from "@/shared/components/PageTable";
import { Badge } from "@/shared/ui/badge";
import { CardPage } from "@/shared/ui/card";
import { Link } from "@/shared/ui/link";
import { Skeleton } from "@/shared/ui/skeleton";
import { cn } from "@/shared/utils/cn";
import { renderTitle } from "@/shared/utils/renderTitle";

const charactersListDocument = gql(`
  query CharactersList($page: Int!, $perPage: Int!, $search: String) {
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

const columns: ExtractColumns<CharactersListQuery> = [
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
    render: ({ media }) => (
      <div className="flex flex-wrap gap-1">
        {media?.nodes?.slice(0, 3).map((anime) => (
          <Badge key={anime?.id} className="whitespace-nowrap">
            <Link to={`anime/${anime?.id}`}>{renderTitle(anime?.title)}</Link>
          </Badge>
        ))}
        {media?.nodes?.length && media.nodes.length > 3 && <Badge>...</Badge>}
      </div>
    ),
    width: 600,
  },
];

export default function CharactersList() {
  return (
    <CardPage className="flex flex-col">
      <PageTable
        queryKey="charactersList"
        document={charactersListDocument}
        columns={columns}
      />
    </CardPage>
  );
}
