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
  uuid: string;

  constructor(context?: vscode.ExtensionContext, webview?: vscode.Webview) {
    this.uuid = nanoid();
    // @ts-ignore
    this.vscode = typeof acquireVsCodeApi === 'function' ? acquireVsCodeApi() : null;
    if (!this.vscode) {
      this.webview = webview;
      this.context = context;
    }
  }

  call({ method, params, success }: CallParams) {
    if (this.vscode) {
      this.vscode.postMessage({ method, params, uuid: this.uuid });
      window.addEventListener('message', event => {
        const message = event.data;
        if (message.uuid === this.uuid) {
          success(message);
        }
      });
    } else {
      this.webview.postMessage({ method, params, uuid: this.uuid });
      this.webview.onDidReceiveMessage(
        message => {
          if (message.uuid === this.uuid) {
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
        if (message.uuid === this.uuid) {
          const data = await listener(message);
          this.vscode.postMessage({ method, data });
        }
      });
    } else {
      this.webview.onDidReceiveMessage(
        async message => {
          if (message.uuid === this.uuid) {
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
