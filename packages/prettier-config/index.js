module.exports = {
  printWidth: 100, // 一行的字符数，如果超过会进行换行，默认为 80
  tabWidth: 2, // tab 缩进大小,默认为 2
  useTabs: false, // 使用 tab 缩进，默认 false
  semi: true, // 使用分号, 默认 true
  /**
   * 行尾逗号,默认 none,可选 none|es5|all
   * es5 包括 es5 中的数组、对象
   * all 包括函数对象等所有可选
   */
  trailingComma: 'es5',
  singleQuote: true, // 使用单引号, 默认 false (在 jsx 中配置无效, 默认都是双引号)
  /**
   * 对象中的空格 默认 true
   * true: { foo: bar }
   * false: {foo: bar}
   */
  bracketSpacing: true,
  /**
   * 标签闭合位置 默认 false
   * false:
   * <div
   *  className=""
   *  style={{}}
   * >
   * true:
   * <div
   *  className=""
   *  style={{}} >
   */
  angleBracketSameLine: false,
  /**
   * 箭头函数参数括号 默认avoid 可选 avoid| always
   * avoid 能省略括号的时候就省略 例如x => x
   * always 总是有括号
   */
  arrowParens: 'avoid',
  vueIndentScriptAndStyle: false, // vue 文件 script 和 style 标签缩进，默认false
  endOfLine: 'lf', // 强制使用 unix 风格的换行符
};
