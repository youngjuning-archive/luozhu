import vscode from 'vscode';
import CustomEditorProvider from './CustomEditorProvider.tpl';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "{{name}}" is now active!');

  context.subscriptions.push(CustomEditorProvider.register(context));
}

export function deactivate() {}
