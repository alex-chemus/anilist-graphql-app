import { QueryClient } from "@tanstack/react-query";

const MINUTE = 100 * 60;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: MINUTE,
      staleTime: MINUTE,
    },
  },
});
