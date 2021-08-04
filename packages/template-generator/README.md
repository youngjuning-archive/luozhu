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
