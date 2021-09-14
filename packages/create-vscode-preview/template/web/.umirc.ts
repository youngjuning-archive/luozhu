import { defineConfig, IConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/', component: '@/pages/index' }],
  fastRefresh: {}, // 开发时可以保持组件状态，同时编辑提供即时反馈。
  history: {
    type: 'memory', // 默认的类型是 `browser`，但是由于 vscode webview 环境不存在浏览器路由，改成 `memory` 和 `hash` 都可以
  },
  devServer: {
    // 需要在 dev 时写文件到输出目录，这样保证开发阶段有 js/css 文件
    writeToDisk: filePath =>
      ['umi.js', 'umi.css'].some(name => filePath.endsWith(name)),
  },
} as IConfig);
