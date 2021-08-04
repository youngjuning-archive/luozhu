module.exports = {
  root: true,
  extends: ['@luozhu/eslint-config-typescript'],
  ignorePatterns: ['lib', '**/*.d.ts'],
  parserOptions: {
    project: ['./tsconfig.json'],
  },
};
