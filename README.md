<div align="center">
  <h1>洛竹🎋</h1>
  <img alt="" src="https://user-images.githubusercontent.com/13204332/128195385-ed8af07f-78a8-4254-937a-56c816712575.png" width="200"/>
  <p>Truth is endless. Keep coding.</p>
</div>

## Scaffold

- [x] [@luozhu/template-generator](https://github.com/youngjuning/luozhu/tree/main/packages/template-generator)：A template generator based on handlebars.
- [x] [create-luozhu-package](https://github.com/youngjuning/luozhu/packages/create-luozhu-package/)
- [x] [@luozhu/create-lerna-app](https://github.com/youngjuning/luozhu/packages/create-lerna-app/)
- [ ] [@luozhu/create-commitlint](https://github.com/youngjuning/luozhu/packages/create-commitlint/)
- [ ] [@luozhu/create-react-jest](https://github.com/youngjuning/luozhu/packages/create-react-jest/)
- [ ] [@luozhu/create-react-native-jest](https://github.com/youngjuning/luozhupackages/create-react-native-jest/)
- [ ] [@luozhu/create-rollup](https://github.com/youngjuning/luozhu/packages/create-rollup/)

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

```sh
$ yarn add lint-staged yorkie -D
```

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
