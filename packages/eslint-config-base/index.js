require('./patch');

module.exports = {
  overrides: [
    {
      files: ['*.js'],
      extends: ['airbnb-base', 'plugin:prettier/recommended', 'prettier'],
      rules: require('./rule'),
    },
  ],
};
