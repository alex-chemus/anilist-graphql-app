import { gql, gqlClient } from "@/api";
import { DEFAULT_PER_PAGE } from "@/shared/constants";
import { useInfiniteQuery } from "@tanstack/react-query";

const StudioModalDocument = gql(`
  query StudioModal($id: Int!, $page: Int!, $perPage: Int!) {
    Studio(id: $id) {
      id
      name
      media(page: $page perPage: $perPage) {
        pageInfo {
          hasNextPage
        }
        nodes {
          id
          title {
            ...TitleFragment
          }
          coverImage {
            medium
          }
        }
      }
    }
  }  
`);

export default function useStudioModal(id: number, enabled: boolean) {
  return useInfiniteQuery({
    queryKey: ["StudioModal", id],
    queryFn: ({ pageParam: page }) =>
      gqlClient.request(StudioModalDocument, {
        id,
        page,
        perPage: DEFAULT_PER_PAGE,
      }),
    initialPageParam: 1,
    getNextPageParam: (page, __, lastPage) =>
      page.Studio?.media?.pageInfo?.hasNextPage ? lastPage + 1 : null,
    select: ({ pages }) => ({
      id: pages[0].Studio?.id,
      name: pages[0].Studio?.name,
      media: pages.map((page) => page.Studio?.media?.nodes).flat(),
    }),
    enabled,
  });
}
