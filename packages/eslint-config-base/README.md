# @luozhu/eslint-config-base

## Install

```sh
$ yarn add -D @luozhu/eslint-config-base eslint prettier
```

## Usage

```js
// .eslintrc.js
module.exports = {
  root: true,
  extends: ['@luozhu/eslint-config-base'],
};
```

## Problem

### ESLint plugins used by this config must also be installed within your project. This is a limitation within ESLint.

**Related Links:**

- [Support having plugins as dependencies in shareable config](https://github.com/eslint/eslint/issues/3458)
- [rfcs](https://github.com/eslint/rfcs/tree/main/designs/2019-config-simplification)
- [progress](https://github.com/eslint/eslint/issues/13481)

**Temporary Solutions:**

- [Fix eslint shareable config using rushstack/eslint-patch](https://github.com/facebook/create-react-app/commit/6e10091a235ba4e15097be79b003fdde1f373331)
