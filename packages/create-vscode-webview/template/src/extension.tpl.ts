import vscode from 'vscode';
import { createUmiWebviewPanel } from '@luozhu/vscode-utils';

let currentPanel: vscode.WebviewPanel | undefined;
export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "{{name}}" is now active!');
  context.subscriptions.push(
    vscode.commands.registerCommand('{{name}}.start', async () => {
      currentPanel = createUmiWebviewPanel(
        context,
        '{{name}}',
        '{{displayName}}',
        'assets/icon.png',
        '^3.5.17'
      );
    })
  );
}

export function deactivate() {}
