require('./patch');

module.exports = {
  extends: ['@luozhu/eslint-config-typescript'],
  overrides: [
    {
      files: ['*.jsx'],
      extends: ['airbnb', 'airbnb/hooks', 'plugin:prettier/recommended', 'prettier'],
      parserOptions: {
        ecmaFeatures: {
          impliedStrict: true,
          jsx: true,
        },
        ecmaVersion: 2020,
      },
      rules: {
        ...require('@luozhu/eslint-config-base/rule'),
        ...require('./rule'),
      },
      settings: {
        react: {
          version: 'detect',
        },
      },
    },
  ],
};
