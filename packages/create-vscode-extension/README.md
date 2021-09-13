# @luozhu/create-vscode-extension

Luozhu's vscode extension template.

## 随用随走

```sh
$ npx @luozhu/create-vscode-extension <projectName>
# 或者
$ npm init @luozhu/create-vscode-extension <projectName>
# 或者
$ yarn create @luozhu/create-vscode-extension <projectName>
```

## 全局安装

```sh
# 安装
$ npm install @luozhu/create-vscode-extension -g
# 使用
$ create-vscode-extension <projectName>
```

## 开发前必看

1. 务必替换 Icon（默认是洛竹早茶馆公众号二维码）
2. 务必修改 README.md（默认的执行 `vsce package` 会报错）
3. 模板配置了 commit 提交规范，提交信息需要符合规范

## 发布前必看

1. 提升版本执行 `yarn release-it`
2. 发布到商店执行 `yarn publish-it`

### 推荐工具

- [@luozhu/vscode-utils](https://github.com/youngjuning/luozhu/tree/main/packages/vscode-utils)：vscode 扩展开发相关 utils
- [@luozhu/vscode-channel](https://github.com/youngjuning/luozhu/tree/main/packages/vscode-channel)：vscode 和 webview 通信的 channel
- [vscode-nls-i18n](https://www.npmjs.com/package/vscode-nls-i18n)：支持 vscode i18n 的库
- [axios 简单封装](https://github.com/youngjuning/juejin-me/blob/main/src/utils/axios.ts)

### 相关文档

- [VS Code 扩展开发中文文档](https://liiked.github.io/VS-Code-Extension-Doc-ZH/#/)
- [VS Code API 中文文档](https://vscode-api-cn.js.org/)
- [VS Code 官网文档](https://code.visualstudio.com/docs)
- [vscode 插件发布](http://tny.im/bShcp)
