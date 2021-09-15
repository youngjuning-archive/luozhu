/* eslint-disable @typescript-eslint/ban-ts-comment */
import vscode from 'vscode';
import { nanoid } from 'nanoid';
import { WebviewApi } from 'vscode-webview';

export interface ChannelEventMessage {
  eventId: string;
  method?: string;
  params?;
}

type BindListener =
  | ((message) => Record<string, unknown>)
  | ((message) => Promise<Record<string, unknown>>)
  | ((message) => void);

export default class Channel<WebViewStateType = unknown> {
  vscode: WebviewApi<WebViewStateType>;
  webview: vscode.Webview;
  context: vscode.ExtensionContext;
  constructor(context?: vscode.ExtensionContext, webviewPanel?: vscode.WebviewPanel) {
    this.vscode = typeof acquireVsCodeApi === 'function' ? acquireVsCodeApi() : null;
    if (!this.vscode) {
      this.webview = webviewPanel.webview;
      this.context = context;
    }
  }

  call(method: string, params) {
    return new Promise(resolve => {
      const eventId = nanoid();

      if (this.vscode) {
        this.vscode.postMessage({ eventId, method, params });

        const listener = event => {
          const message: ChannelEventMessage = event.data;
          if (message.eventId === eventId) {
            resolve(message);
            window.removeEventListener('message', listener);
          }
        };

        window.addEventListener('message', listener);
      } else {
        this.webview.postMessage({ eventId, method, params });
        const disposable = this.webview.onDidReceiveMessage(
          message => {
            if (message.eventId === eventId) {
              resolve(message);
              disposable.dispose();
            }
          },
          undefined,
          this.context.subscriptions
        );
      }
    });
  }

  bind(method: string, listener: BindListener) {
    if (this.vscode) {
      window.addEventListener('message', async event => {
        const message: ChannelEventMessage = event.data;
        if (method === message.method) {
          const data = await listener(message);
          if (data) {
            this.vscode.postMessage({ ...message, payload: data });
          }
        }
      });
    } else {
      this.webview.onDidReceiveMessage(
        async (message: ChannelEventMessage) => {
          if (method === message.method) {
            const data = await listener(message);
            if (data) {
              this.webview.postMessage({ ...message, payload: data });
            }
          }
        },
        undefined,
        this.context.subscriptions
      );
    }
  }
}
