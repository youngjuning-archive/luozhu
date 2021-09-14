import vscode from 'vscode';
import { getUmiHTMLContent } from '@luozhu/vscode-utils';

class CustomEditorProvider implements vscode.CustomTextEditorProvider {
  static register(context: vscode.ExtensionContext): vscode.Disposable {
    const provider = new CustomEditorProvider(context);
    const providerRegistration = vscode.window.registerCustomEditorProvider(
      CustomEditorProvider.viewType,
      provider
    );
    return providerRegistration;
  }

  private static readonly viewType = '{{name}}.{{viewType}}';

  constructor(private readonly context: vscode.ExtensionContext) {}

  /**
   * 当自定义编辑器打开时调用。
   */
  async resolveCustomTextEditor(
    document: vscode.TextDocument,
    webviewPanel: vscode.WebviewPanel,
    _token: vscode.CancellationToken
  ): Promise<void> {
    // 给 webview 设置初始内容
    webviewPanel.webview.options = {
      enableScripts: true,
    };
    webviewPanel.webview.html = getUmiHTMLContent(this.context, webviewPanel);
  }
}

export default CustomEditorProvider;
