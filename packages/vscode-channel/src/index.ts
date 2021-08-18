/* eslint-disable @typescript-eslint/ban-ts-comment */
import vscode from 'vscode';
import { nanoid } from 'nanoid';

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
  constructor(context?: vscode.ExtensionContext, webviewPanel?: vscode.WebviewPanel) {
    // @ts-ignore
    this.vscode = typeof acquireVsCodeApi === 'function' ? acquireVsCodeApi() : null;
    if (!this.vscode) {
      this.webview = webviewPanel.webview;
      this.context = context;
    }
  }

  call({ method, params, success }: CallParams) {
    const eventId = nanoid();

    if (this.vscode) {
      this.vscode.postMessage({
        eventId,
        method,
        params,
      });
      window.addEventListener('message', event => {
        const message = event.data;
        if (message.eventId === eventId) {
          success(message);
        }
      });
    } else {
      this.webview.postMessage({ eventId, method, params });
      this.webview.onDidReceiveMessage(
        message => {
          if (message.eventId === eventId) {
            success(message);
          }
        },
        undefined,
        this.context.subscriptions
      );
    }
  }

  bind(listener: bindListener) {
    if (this.vscode) {
      window.addEventListener('message', async event => {
        const message = event.data;
        const data = await listener(message);
        this.vscode.postMessage({ ...message, data });
      });
    } else {
      this.webview.onDidReceiveMessage(
        async message => {
          const data = await listener(message);
          this.webview.postMessage({ ...message, data });
        },
        undefined,
        this.context.subscriptions
      );
    }
  }
}
