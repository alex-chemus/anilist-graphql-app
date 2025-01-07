import { gql, gqlClient } from "@/api";
import { CharacterSort } from "@/api/graphql/graphql";
import { DEFAULT_PER_PAGE } from "@/shared/constants";
import { useInfiniteQuery } from "@tanstack/react-query";

const CharactersListDocument = gql(`
  query CharactersAnimeConnection($id: Int!, $sort: [CharacterSort], $page: Int!, $perPage: Int!) {
    Media(id: $id, type: ANIME) {
      characters(sort: $sort, page: $page, perPage: $perPage) {
        nodes {
          id
          name {
            ...CharacterNameFragment
          }
          image {
            medium
          }
        }
      }
    }
  }
`);

export default function useCharactersList(id: number, sort: CharacterSort) {
  return useInfiniteQuery({
    queryKey: ["CharactersAnimeConnection", id, sort],
    queryFn: ({ pageParam: page }) =>
      gqlClient.request(CharactersListDocument, {
        id,
        sort,
        page,
        perPage: DEFAULT_PER_PAGE,
      }),
    initialPageParam: 1,
    getNextPageParam: (_, __, lastPage) => lastPage + 1,
    select: ({ pages }) =>
      pages.map((page) => page.Media?.characters?.nodes).flat(),
  });
}
