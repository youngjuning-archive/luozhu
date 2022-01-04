import vscode from 'vscode';
import path from 'path';

/**
 * 获取基于 umijs 的 webview 内容
 * @param context 扩展上下文
 * @param webviewPanel webview 面板对象
 * @param options 配置项
 * @returns string
 */
export const getUmiHTMLContent = (
  context: vscode.ExtensionContext,
  webviewPanel: vscode.WebviewPanel,
  options?: {
    rootPath?: string;
    title?: string;
    style?: string;
  }
): string => {
  const title = options!.title || 'umijs';
  const rootPath = options!.rootPath || 'web';
  const style = options!.style || '';
  // 获取内容的 Uri
  const getDiskPath = (fileName: string) => {
    return webviewPanel.webview.asWebviewUri(
      vscode.Uri.file(path.join(context.extensionPath, rootPath, 'dist', fileName))
    );
  };
  // eslint-disable-next-line import/no-unresolved
  const umiVersion = require('../../../umi/package.json').version;

  return `
    <html>
      <head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"
        />
        <title>${title}</title>
        <link rel="stylesheet" href="${getDiskPath('umi.css')}" />
        <style>
          // 给 webview 内容加上主题
          #root {
            background-color: var(--vscode-editor-background);
          }
          body {
            padding: 0 var(--container-paddding);
            color: var(--vscode-foreground);
            font-size: var(--vscode-font-size);
            font-weight: var(--vscode-font-weight);
            font-family: var(--vscode-font-family);
            background-color: var(--vscode-editor-background);
          }
          body.vscode-light {
            color: black;
            background-color: var(--vscode-editor-background);
          }
          body.vscode-light h1, h2, h3, h4, h5, h6 {
            color: black;
          }
          body.vscode-dark {
            color: white;
            background-color: var(--vscode-editor-background);
          }
          body.vscode-dark h1, h2, h3, h4, h5, h6 {
            color: white;
          }
          body.vscode-high-contrast {
            color: red;
            background-color: var(--vscode-editor-background);
          }
          body.vscode-high-contrast h1, h2, h3, h4, h5, h6 {
            color: red;
          }
          ${style}
        </style>
        <script>
          //! umi version: ${umiVersion}
        </script>
      </head>
      <body>
        <div id="root"></div>

        <script src="${getDiskPath('umi.js')}"></script>
      </body>
    </html>
  `;
};

// 追踪当前 webview 面板
let currentPanel: vscode.WebviewPanel | undefined;
/**
 * 获取基于 umijs 的 webview 内容
 * @param context 扩展上下文
 * @param viewType webview 面板的唯一标识符
 * @param title webview 面板的标题
 * @param iconPath webview 面板的 Icon
 * @returns vscode.WebviewPanel
 */
export const createUmiWebviewPanel = (
  context: vscode.ExtensionContext,
  viewType: string,
  title: string,
  iconPath: string
) => {
  const columnToShowIn = vscode.window.activeTextEditor
    ? vscode.window.activeTextEditor.viewColumn
    : undefined;
  if (currentPanel) {
    // 如果我们已经有了一个面板，那就把它显示到目标列布局中
    currentPanel.reveal(columnToShowIn);
  } else {
    // 否则，创建并显示新的 Webview
    currentPanel = vscode.window.createWebviewPanel(
      viewType, // 只供内部使用，这个 webview 的标识
      title, // 给用户显示的面板标题
      vscode.ViewColumn.One, // 给新的 webview 面板一个编辑器视图
      {
        // webview 面板的内容配置
        enableScripts: true,
        localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'web/dist'))], // 只允许 webview 加载我们插件的 `web/dist` 目录下的资源
        retainContextWhenHidden: true, // 隐藏时保留上下文
      }
    );
    // 设置 Logo
    currentPanel.iconPath = vscode.Uri.file(path.join(context.extensionPath, iconPath));
    // 设置 HTML 内容
    currentPanel.webview.html = getUmiHTMLContent(context, currentPanel);
  }
  // 当前面板被关闭后重置
  currentPanel.onDidDispose(
    () => {
      currentPanel = undefined;
    },
    null,
    context.subscriptions
  );
  return currentPanel;
};
