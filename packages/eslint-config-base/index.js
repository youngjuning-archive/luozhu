require('./patch');
module.exports = {
  extends: [
    'airbnb-base',
    'plugin:prettier/recommended',
    'prettier'
  ],
  env: {
    es6: true,
  },
  parserOptions: {
    ecmaFeatures: {
      impliedStrict: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  }
};
