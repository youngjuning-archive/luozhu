/* eslint-disable @typescript-eslint/ban-ts-comment */
import vscode from 'vscode';

interface CallParams {
  method: string;
  params;
  success: (message) => void;
}

type bindListener =
  | ((message) => Record<string, unknown>)
  | ((message) => Promise<Record<string, unknown>>);

export default class Channel {
  vscode: any;
  webview: vscode.Webview;
  context: vscode.ExtensionContext;
  constructor(context?: vscode.ExtensionContext, webview?: vscode.Webview) {
    // @ts-ignore
    this.vscode = typeof acquireVsCodeApi === 'function' ? acquireVsCodeApi() : null;
    if (!this.vscode) {
      this.webview = webview;
      this.context = context;
    }
  }

  call({ method, params, success }: CallParams) {
    if (this.vscode) {
      this.vscode.postMessage({
        method,
        params,
      });
      window.addEventListener('message', event => {
        const message = event.data;
        if (message.method === method) {
          success(message);
        }
      });
    } else {
      this.webview.postMessage({ method, params });
      this.webview.onDidReceiveMessage(
        message => {
          if (message.method === method) {
            success(message);
          }
        },
        undefined,
        this.context.subscriptions
      );
    }
  }

  bind(method: string, listener: bindListener) {
    if (this.vscode) {
      window.addEventListener('message', async event => {
        const message = event.data;
        if (message.method === method) {
          const data = await listener(message);
          this.vscode.postMessage({ method, data });
        }
      });
    } else {
      this.webview.onDidReceiveMessage(
        async message => {
          if (message.method === method) {
            const data = await listener(message);
            this.webview.postMessage({ method, data });
          }
        },
        undefined,
        this.context.subscriptions
      );
    }
  }
}
