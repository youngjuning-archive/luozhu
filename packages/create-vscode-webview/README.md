# @luozhu/create-vscode-webview

## 随用随走

```sh
$ npx @luozhu/create-vscode-webview <projectName>
# 或者
$ npm init @luozhu/vscode-webview <projectName>
# 或者
$ yarn create @luozhu/vscode-webview <projectName>
```

## 全局安装

```sh
# 安装
$ npm install @luozhu/create-vscode-webview -g
# 使用
$ create-vscode-webview <projectName>
```

## 进阶

初始生成的项目比较基础，如果您想了解 vscode 扩展中的网络编程、国际化、vscode 与 webview 的通信等功能实现，请参考 [掘金一下](https://github.com/youngjuning/juejin-me) 扩展，它是基于该模板实现的一个专注于管理你的掘金文章的 VS Code 扩展。

### 推荐工具

- [@luozhu/vscode-utils](https://github.com/youngjuning/luozhu/tree/main/packages/vscode-utils)：vscode 扩展开发相关 utils
- [@luozhu/vscode-channel](https://github.com/youngjuning/luozhu/tree/main/packages/vscode-channel)：vscode 和 webview 通信的 channel
- [vscode-nls-i18n](https://www.npmjs.com/package/vscode-nls-i18n)：支持 vscode i18n 的库
- []
- [axios 简单封装](https://github.com/youngjuning/juejin-me/blob/main/src/utils/axios.ts)

### 相关文档

- [VS Code 扩展开发中文文档](https://liiked.github.io/VS-Code-Extension-Doc-ZH/#/)
- [VS Code API 中文文档](https://vscode-api-cn.js.org/)
- [VS Code 官网文档](https://code.visualstudio.com/docs)
- [vscode 插件发布](http://tny.im/bShcp)
