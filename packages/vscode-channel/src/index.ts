/* eslint-disable @typescript-eslint/ban-ts-comment */
import vscode from 'vscode';
import { nanoid } from 'nanoid';
import { WebviewApi } from 'vscode-webview';

export interface ChannelEventMessage<Params, ReturnPayload = void> {
  eventId: string;
  method: string;
  params: Params;
  payload: ReturnPayload;
}

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

  call<TParams = unknown, ReturnPayload = void>(
    method: string,
    params: TParams
  ): Promise<ChannelEventMessage<TParams, ReturnPayload>> {
    return new Promise(resolve => {
      const eventId = nanoid();

      if (this.vscode) {
        this.vscode.postMessage({ eventId, method, params });

        const listener = event => {
          const message: ChannelEventMessage<TParams, ReturnPayload> = event.data;
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

  bind<TParams = unknown, ReturnPayload = void>(
    method: string,
    listener: (message: ChannelEventMessage<TParams>) => ReturnPayload | Promise<ReturnPayload>
  ): void {
    if (this.vscode) {
      window.addEventListener('message', async event => {
        const message: ChannelEventMessage<TParams> = event.data;
        if (method === message.method) {
          const data = await listener(message);
          if (data) {
            this.vscode.postMessage({ ...message, payload: data });
          }
        }
      });
    } else {
      this.webview.onDidReceiveMessage(
        async (message: ChannelEventMessage<TParams>) => {
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
