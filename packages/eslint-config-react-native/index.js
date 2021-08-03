require('./patch');

module.exports = {
  extends: ['plugin:react-native/all', '@luozhu/eslint-config-react-typescript'],
  env: {
    'react-native/react-native': true,
  },
  rules: {
    'react-native/no-color-literals': 0,
    'react-native/split-platform-components': 0,
    'react-native/no-raw-text': 0,
    'react-native/no-inline-styles': 1,
  },
  overrides: [
    {
      files: ['*.jsx', '*.js'],
      parserOptions: {
        babelOptions: {
          presets: ['module:metro-react-native-babel-preset'],
        },
      },
    },
  ],
};
