import { setLocale } from 'umi';

require('./index.less');

setLocale(window.vscodeEnv.language === 'zh-cn' ? 'zh-CN' : window.vscodeEnv.language, false);

export default props => {
  return <>{props.children}</>;
};
