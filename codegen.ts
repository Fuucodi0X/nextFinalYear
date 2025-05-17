
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://massive-worm-1767.ddn.hasura.app/graphql",
  documents: "app/**/*.tsx",
  generates: {
    "lib/apollo/gql/": {
      preset: "client",
      plugins: []
    }
  }
};

export default config;
