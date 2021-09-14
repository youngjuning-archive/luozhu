module.exports = {
  root: true,
  extends: ['@luozhu/eslint-config-react-typescript'],
  ignorePatterns: ['out', '**/*.d.ts'],
  rules: {
    'no-console': 0,
    'no-useless-constructor': 0,
    'no-param-reassign': 0,
    '@typescript-eslint/ban-ts-comment': 0,
  },
};
