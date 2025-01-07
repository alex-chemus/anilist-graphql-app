import { gql, gqlClient } from "@/api";
import { StudioSort } from "@/api/graphql/graphql";
import { useQuery } from "@tanstack/react-query";

const StudiosListDocument = gql(`
  query StudiosAnimeConnection($id: Int!, $sort: [StudioSort]) {
    Media(id: $id, type: ANIME) {
      studios(sort: $sort) {
        nodes {
          id
          name
          isAnimationStudio
        }
      }
    }
  }
`);

export default function useStudiosList(id: number, sort: StudioSort) {
  return useQuery({
    queryKey: ["StudiosAnimeConnection", id, sort],
    queryFn: () => gqlClient.request(StudiosListDocument, { id, sort }),
    select: (r) => r.Media?.studios?.nodes,
  });
}
