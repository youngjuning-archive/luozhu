# handlebars-template-compiler

## Install

```sh
$ npm install handlebars-template-compiler
```

OR

```sh
$ yarn add handlebars-template-compiler
```

## Usage

```ts
const compiler = require('handlebars-template-compiler');
compiler(
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
