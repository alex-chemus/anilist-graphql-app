import "dotenv/config";
import type { CodegenConfig } from "@graphql-codegen/cli";

const schema = process.env.VITE_GRAPHQL_CLIENT;

const config: CodegenConfig = {
  schema,
  documents: ["src/**/*.tsx", "src/**/*.ts"],
  ignoreNoDocuments: true,
  generates: {
    "./src/api/graphql/": {
      preset: "client",
      presetConfig: {
        fragmentMasking: false,
      },
    },
    "./src/api/schema.graphql": {
      plugins: ["schema-ast"],
      config: {
        includeDirectives: true,
      },
    },
  },
};

export default config;
