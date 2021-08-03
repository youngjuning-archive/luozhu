require('./patch');

module.exports = {
  extends: ['@luozhu/eslint-config-base'],
  overrides: [
    {
      files: ['*.ts'],
      extends: ['airbnb-base', 'plugin:@typescript-eslint/recommended', 'prettier'],
      parser: '@typescript-eslint/parser',
      rules: {
        ...require('@luozhu/eslint-config-base/rule'),
        ...require('./rule'),
      },
    },
  ],
};
