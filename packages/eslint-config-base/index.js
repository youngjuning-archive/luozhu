require('./patch');

module.exports = {
  overrides: [
    {
      files: ['*.js'],
      extends: ['airbnb-base', 'plugin:prettier/recommended', 'prettier'],
      parserOptions: {
        ecmaFeatures: {
          impliedStrict: true,
        },
        ecmaVersion: 2020,
      },
      rules: require('@luozhu/eslint-rules').javascript,
    },
  ],
};
