/* eslint-disable @typescript-eslint/ban-ts-comment */
import vscode from 'vscode';
import { nanoid } from 'nanoid';
import { WebviewApi } from 'vscode-webview';

export interface ChannelEventMessage<TRequest, TResponse = void> {
  eventId: string;
  method: string;
  request: TRequest;
  response?: TResponse;
  error?: Error;
}

export default class Channel<WebViewStateType = unknown> {
  private readonly vscode?: WebviewApi<WebViewStateType>;
  private readonly webview?: vscode.Webview;
  private readonly context?: vscode.ExtensionContext;
  constructor(context?: vscode.ExtensionContext, webviewPanel?: vscode.WebviewPanel) {
    if (typeof acquireVsCodeApi === 'function') {
      this.vscode = acquireVsCodeApi();
    } else if (context && webviewPanel) {
      this.webview = webviewPanel.webview;
      this.context = context;
    } else {
      throw new Error(
        'You are in vscode (Node.js) environment, so you must provide a webviewPanel to be bound to current vscode context!'
      );
    }
  }

  call<TRequest = unknown, TResponse = void>(
    method: string,
    request?: TRequest
  ): Promise<TResponse | undefined> {
    return new Promise((resolve, reject) => {
      const eventId = nanoid();

      if (this.vscode) {
        this.vscode.postMessage({ eventId, method, request });

        const listener = event => {
          const message: ChannelEventMessage<TRequest, TResponse> = event.data;
          if (message.eventId === eventId) {
            window.removeEventListener('message', listener);
            message.error ? reject(message.error) : resolve(message.response);
          }
        };

        window.addEventListener('message', listener);
      } else if (this.context && this.webview) {
        this.webview.postMessage({ eventId, method, request });
        const disposable = this.webview.onDidReceiveMessage(
          message => {
            if (message.eventId === eventId) {
              disposable.dispose();
              message.error ? reject(message.error) : resolve(message.response);
            }
          },
          undefined,
          this.context.subscriptions
        );
      } else {
        reject(new Error('Channel not initialized correctly, call failed!'));
      }
    });
  }

  bind<TRequest = unknown, TResponse = void>(
    method: string,
    listener: (request: TRequest) => TResponse | Promise<TResponse>
  ): void {
    if (this.vscode) {
      window.addEventListener('message', async event => {
        const message: ChannelEventMessage<TRequest, TResponse> = event.data;
        if (method === message.method) {
          try {
            const data = await listener(message.request);
            this.vscode!.postMessage({ ...message, response: data });
          } catch (error) {
            this.vscode!.postMessage({ ...message, error });
          }
        }
      });
    } else if (this.context && this.webview) {
      this.webview.onDidReceiveMessage(
        async (message: ChannelEventMessage<TRequest, TResponse>) => {
          if (method === message.method) {
            try {
              const data = await listener(message.request);
              this.webview!.postMessage({ ...message, response: data });
            } catch (error) {
              this.webview!.postMessage({ ...message, error });
            }
          }
        },
        undefined,
        this.context.subscriptions
      );
    } else {
      throw new Error('Channel not initialized correctly, bind failed!');
    }
  }
}
