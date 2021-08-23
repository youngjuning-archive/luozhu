import vscode from 'vscode';
import { createUmiWebviewPanel } from '@luozhu/vscode-utils';
import { init } from 'vscode-nls-i18n';

let currentPanel: vscode.WebviewPanel | undefined;
export function activate(context: vscode.ExtensionContext) {
  init(context.extensionPath);
  console.log('Congratulations, your extension "{{name}}" is now active!');
  context.subscriptions.push(
    vscode.commands.registerCommand('{{name}}.start', async () => {
      currentPanel = createUmiWebviewPanel(
        context,
        '{{name}}',
        '{{name}}',
        'assets/icon.png',
        '3.5.17'
      );
    })
  );
}

export function deactivate() {}
