<div align="center">
  <h1>洛竹🎋</h1>
  <img alt="" src="https://user-images.githubusercontent.com/13204332/128195385-ed8af07f-78a8-4254-937a-56c816712575.png" width="200"/>
  <p>Truth is endless. Keep coding.</p>
</div>

## Scaffold

- [x] [@luozhu/template-generator](https://github.com/youngjuning/luozhu/tree/main/packages/template-generator)：A template generator based on handlebars.
- [x] [create-luozhu-package](https://github.com/youngjuning/luozhu/tree/main/packages/create-luozhu-package/)：Create a luozhu package in this repo.
- [x] [@luozhu/create-lerna-app](https://github.com/youngjuning/luozhu/tree/main/packages/create-lerna-app/)：Create a app with lerna best practice.
- [x] [@luozhu/create-commitlint](https://github.com/youngjuning/luozhu/tree/main/packages/create-commitlint)：Init commintlint in exist project.
- [ ] [@luozhu/create-react-jest](https://github.com/youngjuning/luozhu/tree/main/packages/create-react-jest/)
- [ ] [@luozhu/create-react-native-jest](https://github.com/youngjuning/luozhu/tree/main/packages/create-react-native-jest/)
- [ ] [@luozhu/create-rollup](https://github.com/youngjuning/luozhu/tree/main/packages/create-rollup/)
- [ ] [@luozhu/create-npm-package](https://github.com/youngjuning/luozhu/tree/main/packages/create-npm-package/)

## vscode

- [x] [@luozhu/vscode-utils](https://github.com/youngjuning/luozhu/tree/main/packages/vscode-utils]/)：vscode extension develop utils.
- [x] [@luozhu/vscode-channel](https://github.com/youngjuning/luozhu/tree/main/packages/vscode-channel/)：channel for vscode communication with webview.

## Coding Style

### Editorconfig

> vscode extension: [editorconfig.editorconfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

> Config file is `.editorconfig`

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

### Prettier

**Install:**

```$
$ yarn add @luozhu/prettier-config prettier -D
```

**Config:**

> Config file is `.prettierrc.js`

```js
module.exports = require('@luozhu/prettier-config');
```

### Eslint

> vscode extension: [dbaeumer.vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

You must add eslint by yourself.

```sh
$ yarn add eslint -D
```

#### Packages

- [@luozhu/eslint-config-base](https://github.com/youngjuning/luozhu/tree/main/packages/eslint-config-base#readme) for pure javascript project.
- [@luozhu/eslint-config-typescript](https://github.com/youngjuning/luozhu/tree/main/packages/eslint-config-typescript#readme) for javascript、typescript project.
- [@luozhu/eslint-config-react](https://github.com/youngjuning/luozhu/tree/main/packages/eslint-config-react#readme) for react project.
- [@luozhu/eslint-config-react-typescript](https://github.com/youngjuning/luozhu/tree/main/packages/eslint-config-react-typescript#readme) for react、react with typescript project.
- [@luozhu/eslint-config-react-native](https://github.com/youngjuning/luozhu/tree/main/packages/eslint-config-react-native#readme) for react-native project.

### pre-commit lint

#### Install

```sh
$ yarn add lint-staged yorkie -D
```

#### Config

> config file is package.json

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

### vscode config

```js
{
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
}
```
