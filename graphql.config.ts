import "dotenv/config";

export default {
  schema: process.env.VITE_GRAPHQL_CLIENT,
  documents: "**/*.{graphql,js,ts,jsx,tsx}",
};
