import { setLocale } from 'umi';
import Channel from '@luozhu/vscode-channel';

require('./index.less');

window.channel = new Channel();
setLocale(window.vscodeEnv.language === 'zh-cn' ? 'zh-CN' : window.vscodeEnv.language, false);

export default props => {
  return <>{props.children}</>;
};
