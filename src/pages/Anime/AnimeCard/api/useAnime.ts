import { gql } from "@/api";
import { client } from "@/api/gqlClient";
import { useSuspenseQuery } from "@tanstack/react-query";

const animeDocument = gql(`
  query AnimeCard($id: Int!) {
    Media(id: $id, type: ANIME) {
      title {
        ...TitleFragment
      }
      startDate {
        ...FuzzyDateFragment
      }
      endDate {
        ...FuzzyDateFragment
      }
      status
      episodes
      countryOfOrigin
      format
      coverImage {
        extraLarge
      }
      genres
      averageScore
      description

      data: characters {
     pageInfo {
       total
       perPage
       currentPage
       lastPage
       hasNextPage
     }
      nodes {
        id
        name {
          first
          middle
          last
          full
          native
          userPreferred
        }
      }
    }
    }
  }
`);

export default function useAnime(id: number) {
  return useSuspenseQuery({
    queryKey: ["AnimeCard", id],
    queryFn: () => client.request(animeDocument, { id }),
    select: (r) => r.Media,
  });
}
