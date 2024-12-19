import { GraphQLClient } from "graphql-request";

const endpoint = import.meta.env.VITE_GRAPHQL_CLIENT;

export const client = new GraphQLClient(endpoint, { credentials: "omit" });
