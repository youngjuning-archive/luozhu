# @luozhu/eslint-config-base

## Install

```sh
$ yarn add -D @luozhu/eslint-config-typescript eslint prettier typescript @luozhu/prettier-config lint-staged yorkie
```

## Usage

### .eslintrc.js

> vscode extension: [dbaeumer.vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

```js
module.exports = {
  root: true,
  extends: ['@luozhu/eslint-config-typescript'],
};
```

### .prettierrc.js

```js
module.exports = require('@luozhu/prettier-config');
```

### .editorconfig

> vscode extension: [editorconfig.editorconfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

```
# EditorConfig is awesome: http://EditorConfig.org

# top-most EditorConfig file
root = true

# Unix-style newlines with a newline ending every file
[*]
quote_type = single # Fix Prettier "prettier.singleQuote" not working in 1.40 vs code
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false
```

### pre-commit lint

#### package.json

```json
{
  "gitHooks": {
    "pre-commit": "lint-staged"
  },
  "lint-staged": {
    "**/*.{js,jsx,ts,tsx}": ["eslint --fix"],
    "**/*.{md,json}": ["prettier --write"]
  }
}
```

#### .vscode/settings.json

```js
{
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
}
```

## Problem

### ESLint plugins used by this config must also be installed within your project. This is a limitation within ESLint.

**Related Links:**

- [Support having plugins as dependencies in shareable config](https://github.com/eslint/eslint/issues/3458)
- [rfcs](https://github.com/eslint/rfcs/tree/main/designs/2019-config-simplification)
- [progress](https://github.com/eslint/eslint/issues/13481)

**Temporary Solutions:**

- [Fix eslint shareable config using rushstack/eslint-patch](https://github.com/facebook/create-react-app/commit/6e10091a235ba4e15097be79b003fdde1f373331)
