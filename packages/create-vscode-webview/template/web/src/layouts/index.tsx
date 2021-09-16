import { setLocale } from 'umi';

require('./index.less');

// TODO: 重构 vscode env 的获取方式
setLocale(window.vscodeEnv.language === 'zh-cn' ? 'zh-CN' : window.vscodeEnv.language, false);

export default props => {
  return <>{props.children}</>;
};
