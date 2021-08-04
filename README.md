<div align="center">
  <h1>洛竹</h1>
  <img alt="" src="https://user-images.githubusercontent.com/13204332/128195385-ed8af07f-78a8-4254-937a-56c816712575.png" width="200"/>
  <p>大家好，我是洛竹🎋，一只住在杭城的木系前端🧚🏻‍♀️，如果你喜欢我的项目，可以通过⭐️帮我聚集灵力。</p>
</div>

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
$ yarn add @luozhu/prettier-config -D
```

**Config:**

> Config file is `.prettierrc.js`

```js
module.exports = require('@luozhu/prettier-config');
```

### Eslint

> vscode extension: [dbaeumer.vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

#### Packages

- [@luozhu/eslint-config-base](https://github.com/youngjuning/luozhu-cli/tree/main/packages/eslint-config-base#readme) for pure javascript project.
- [@luozhu/eslint-config-typescript](https://github.com/youngjuning/luozhu-cli/tree/main/packages/eslint-config-typescript#readme) for javascript、typescript project.
- [@luozhu/eslint-config-react](https://github.com/youngjuning/luozhu-cli/tree/main/packages/eslint-config-react#readme) for react project.
- [@luozhu/eslint-config-react-typescript](https://github.com/youngjuning/luozhu-cli/tree/main/packages/eslint-config-react-typescript#readme) for react、react with typescript project.
- [@luozhu/eslint-config-react-native](https://github.com/youngjuning/luozhu-cli/tree/main/packages/eslint-config-react-native#readme) for react-native project.

### lint-staged

```sh
$ yarn add lint-staged yorkie -D
```

```json
{
  "gitHooks": {
    "pre-commit": "lint-staged"
  },
  "lint-staged": {
    "**/*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "git add"
    ],
    "**/*.{less,md,json}": [
      "prettier --write",
      "git add"
    ]
  },
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
