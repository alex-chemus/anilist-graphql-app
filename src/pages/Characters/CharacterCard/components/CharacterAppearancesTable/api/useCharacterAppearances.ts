import { gql, gqlClient } from "@/api";
import { MediaSort } from "@/api/graphql/graphql";
import { DEFAULT_PER_PAGE } from "@/shared/constants";
import { useInfiniteQuery } from "@tanstack/react-query";

const CharacterAppearancesDocument = gql(`
  query CharacterAnimeConnection($id: Int!, $sort: [MediaSort], $page: Int!, $perPage: Int!) {
    Character(id: $id) {
      media(sort: $sort, page: $page, perPage: $perPage) {
        nodes {
          id
          title {
            ...TitleFragment
          }
          status
          coverImage {
            medium
          }
        }
      }
    }
  }  
`);

export default function useCharacterAppearances(id: number, sort: MediaSort) {
  return useInfiniteQuery({
    queryKey: ["CharacterAnimeConnection", id, sort],
    queryFn: ({ pageParam: page }) =>
      gqlClient.request(CharacterAppearancesDocument, {
        id,
        sort,
        page,
        perPage: DEFAULT_PER_PAGE,
      }),
    initialPageParam: 1,
    getNextPageParam: (_, __, lastPage) => lastPage + 1,
    select: ({ pages }) =>
      pages.map((page) => page.Character?.media?.nodes).flat(),
  });
}
