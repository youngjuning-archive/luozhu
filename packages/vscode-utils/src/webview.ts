import vscode from 'vscode';
import path from 'path';

/**
 * 获取基于 umijs 的 webview 内容
 * @param context 扩展上下文
 * @param webviewPanel webview 面板对象
 * @param rootPath webview 所在路径，默认 web
 * @param umiVersion umi 版本
 * @returns string
 */
export const getUmiContent = (
  context: vscode.ExtensionContext,
  webviewPanel: vscode.WebviewPanel,
  umiVersion?: string,
  rootPath = 'web'
) => {
  // 获取内容的 Uri
  const getDiskPath = (fileName: string) => {
    return webviewPanel.webview.asWebviewUri(
      vscode.Uri.file(path.join(context.extensionPath, rootPath, 'dist', fileName))
    );
  };
  return `
    <html>
      <head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"
        />
        <link rel="stylesheet" href="${getDiskPath('umi.css')}" />
        <style>
          html, body, #root {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            overflow: hidden;
          }
          // 给 webview 内容加上主题
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