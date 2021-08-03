require('./patch');

module.exports = {
  overrides: [
    {
      files: ['*.jsx', '*.js'],
      extends: ['airbnb', 'airbnb/hooks', 'plugin:prettier/recommended', 'prettier'],
      parser: '@babel/eslint-parser',
      parserOptions: {
        ecmaFeatures: {
          impliedStrict: true,
          jsx: true,
        },
        requireConfigFile: false,
        babelOptions: {
          presets: ['@babel/preset-react'],
        },
        ecmaVersion: 2020,
      },
      rules: {
        ...require('@luozhu/eslint-rules').javascript,
        ...require('@luozhu/eslint-rules').javascriptReact,
      },
      settings: {
        react: {
          version: 'detect',
        },
      },
    },
  ],
};
