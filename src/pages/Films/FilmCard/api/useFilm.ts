import { gql } from "@/api";
import { client } from "@/api/gqlClient";
import { useQuery } from "@tanstack/react-query";

const filmDocument = gql(`
  query Film($filmId: ID!) {
    film(filmID: $filmId) {
      title
      openingCrawl
    }
  }
`);

export default function useFilm(filmId: string) {
  return useQuery({
    queryKey: ["film", filmId],
    queryFn: () => client.request(filmDocument, { filmId }),
    select: (r) => r.film,
  });
}
