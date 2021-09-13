# @luozhu/template-generator

A template generator based on handlebars.

## Install

```sh
$ npm install @luozhu/template-generator
```

OR

```sh
$ yarn add @luozhu/template-generator
```

## Usage

```ts
const generator = require('@luozhu/template-generator');
// 编译当前目录下所有符合 `**/*.tpl.*` 模式的文件
generator(
  {
    name: '洛竹',
  },
  process.cwd()
);
// 编译当前目录下所有文件
generator(
  {
    name: '洛竹',
  },
  process.cwd()
  {
    tplSuffix: false
  }
);
// 编译当前目录下所有文件（但是排除 .js 结尾的文件）
generator(
  {
    name: '洛竹',
  },
  process.cwd()
  {
    tplSuffix: false,
    exclude: ['**/*.js'],
  }
);
```

具体案例请查看 [@luozhu/create-vscode-extension](https://github.com/youngjuning/luozhu/tree/main/packages/create-vscode-extension)

## Related Links

- [How do I include a .gitignore file as part of my npm module?](https://stackoverflow.com/questions/24976950/how-do-i-include-a-gitignore-file-as-part-of-my-npm-module)
