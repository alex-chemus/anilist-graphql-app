import { gqlClient, gql } from "@/api";
import { useQuery } from "@tanstack/react-query";

const allFilmsDocument = gql(`
  query AllFilms {
    allFilms {
      films {
        episodeID
        title
        director
        releaseDate
      }
    }
  }
`);

export default function useAllFilms() {
  return useQuery({
    queryKey: ["allFilms"],
    queryFn: () => gqlClient.request(allFilmsDocument),
    select: (r) => r.allFilms,
  });
}
