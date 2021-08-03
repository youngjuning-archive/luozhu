require('./patch');

module.exports = {
  extends: ['@luozhu/eslint-config-base'],
  overrides: [
    {
      files: ['*.ts'],
      extends: [
        'airbnb-base',
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
      ],
      parser: '@typescript-eslint/parser',
      rules: {
        ...require('@luozhu/eslint-config-base/rule'),
        ...require('./rule'),
      },
      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
          // use <root>/tsconfig.json
          typescript: {
            alwaysTryTypes: true, // always try to resolve types under `<roo/>@types` directory even it doesn't contain any source code, like `@types/unist`
          },
        },
      },
    },
  ],
};
