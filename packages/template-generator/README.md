# @luozhu/template-generator

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
generator(
  {
    name: '洛竹',
  },
  './tpl',
  {
    tplSuffix: 'tpl',
    exclude: ['**/*.js'],
  }
);
```

## Related Links

- [How do I include a .gitignore file as part of my npm module?](https://stackoverflow.com/questions/24976950/how-do-i-include-a-gitignore-file-as-part-of-my-npm-module)
