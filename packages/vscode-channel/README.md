# @luozhu/vscode-channel

## 安装

```sh
$ yarn install @luozhu/vscode-channel
```

## 使用指南

### 导入库

```ts
import Channel from '@luozhu/vscode-channel';
```

### vscode 中初始化实例

```ts
const channel = new Channel(context, currentPanel);
```

### webview 中初始化实例

```ts
const channel = new Channel();
```

### 发送指令

```ts
channel.call({ method: 'showAuthor' });
```

### 接收指令

`Channel.bind` 方法支持会根据回调函数是否返回 void 来决定事件是全双工还是单工。比如需要在 webview 中调用接口或者获取 vscode 配置信息，那么就需要在 `Channel.bind` 的回调函数中返回数据，Channel 会通过发送事件触发 `Channel.call` 中注册的监听器来实现全双工。

```ts
import { Modal } from 'antd';
...
channel.bind(async message => {
  switch (message.method) {
    case 'showAuthor': {
      Modal.info({
        title: '洛竹',
        content: (
          <div>
            大家好，我是洛竹🎋一只住在杭城的木系前端🧚🏻‍♀️，如果你喜欢我的文章📚，可以通过
            <a href="https://juejin.cn/user/325111174662855/posts">点赞</a>帮我聚集灵力⭐️。
          </div>
        ),
        okText: <a href="https://juejin.cn/user/325111174662855/posts">点赞 o(￣▽￣)ｄ</a>,
      });
      break;
    }
    default:
      break;
  }
});
```
