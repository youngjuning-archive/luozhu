# @luozhu/vscode-channel

## 安装

```sh
$ yarn install @luozhu/vscode-channel
```

## 导入

```ts
import Channel from '@luozhu/vscode-channel';
```

## 初始化

### vscode 中初始化实例

```ts
const channel = new Channel(context, currentPanel);
```

### webview 中初始化实例

> 注意：由于在一个会话中，`acquireVsCodeApi()` 只能调用一次，所以请不要重复初始化 channel。

```ts
const channel = new Channel();
```

## 插件通知 webview

### 插件发送指令

```ts
channel.call('sayHi', {
  name: '洛竹',
});
```

### webview 接收指令

```ts
import { Modal } from 'antd';
...
channel.bind("sayHi", request => {
  Modal.info({
    title: request.name,
    content: (
      <div>
        大家好，我是{request.name}🎋一只住在杭城的木系前端🧚🏻‍♀️，如果你喜欢我的文章📚，可以通过
        <a href="https://juejin.cn/user/325111174662855/posts">点赞</a>帮我聚集灵力⭐️。
      </div>
    ),
    okText: <a href="https://juejin.cn/user/325111174662855/posts">点赞 o(￣▽￣)ｄ</a>,
  });
});
```

## webview 通知插件

### webview 发送指令

```ts
async () => {
  const userInfo = await channel.call('getUserInfo', { userId: '6da59wed6' });
  console.log('用户信息', userInfo);
};
```

### 插件接收指令

```ts
channel.bind('getUserInfo', () => {
  const result = await axios.get('https://localhost:8080/getUserInfo');
  return result.data;
});
```

## 策略模式

方法多的时候，也可以使用策略模式减少代码重复。

```ts
for (method of Object.keys(stratiges)) {
  channel.bind(
    method,
    (request) => {
      return stratiges[method](...request)
    }
  )
}
```
