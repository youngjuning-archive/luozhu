require('./patch');

module.exports = {
  extends: ['@luozhu/eslint-config-base'],
  overrides: [
    {
      files: ['*.ts'],
      extends: [
        'airbnb-base',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'prettier',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./tsconfig.json'], // Specify it only for TypeScript files
        ecmaFeatures: {
          impliedStrict: true,
        },
        ecmaVersion: 2020,
      },
      rules: {
        ...require('@luozhu/eslint-rules').javascript,
        ...require('@luozhu/eslint-rules').typescript,
      },
      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts'],
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
