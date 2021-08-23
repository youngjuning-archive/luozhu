# {{name}}

{{description}}

## 调试

### 安装依赖

```sh
$ yarn install
```

### 开启调试

按 `F5` 就会打开一个扩展开发宿主，默认开启 webview panel 的命令是 `{{name}}.start`。

## 开发

- vscode 扩展的开发在 _src_ 目录下，可参考 [VS Code API 中文文档](https://vscode-api-cn.js.org/) 和 [VS Code 插件开发中文文档](https://liiked.github.io/VS-Code-Extension-Doc-ZH/#/) 进行开发。
- webview panel 的开发在 _web_ 目录下，这部分是基于 umijs 的，可参考 [UmiJS 文档](https://umijs.org/zh-CN/) 进行开发。
- vscode 和 webview panel 的交互推荐使用 [@luozhu/vscode-channel](https://github.com/youngjuning/luozhu/tree/main/packages/vscode-channel)，使用案例参考 [掘金一下](https://github.com/youngjuning/juejin-me)。
- 默认已经将 `vscode.env` 挂载到了 webview panel 的 `window.vscodeEnv` 上，我们可以直接在 webview panel 中通过 `window.vscodeEnv.language` 获取当前语言环境

> 注意：我比较武断地将一些功能封装到了 [@luozhu/vscode-utils](https://github.com/youngjuning/luozhu/tree/main/packages/vscode-utils) 中，这是为了沉淀最佳实践，当然我也保留了部分灵活配置，基本上是能够覆盖绝大部分开发场景的。
