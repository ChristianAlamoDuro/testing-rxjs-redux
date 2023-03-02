import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://rickandmortyapi.com/graphql',
  documents: 'src/app/graphql/**/*.graphql',
  generates: {
    'src/app/graphql/index.ts': {
      plugins: ['typescript-apollo-angular'],
    },
    'graphql.schema.json': {
      plugins: ['introspection'],
    },
    'src/app/graphql/models.d.ts': {
      plugins: [
        {
          typescript: {
            noExport: true,
          },
        },
        {
          'typescript-operations': {
            noExport: true,
          },
        },
      ],
    },
  },
};

export default config;
