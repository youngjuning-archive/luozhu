import { setLocale } from 'umi';

require('./index.less');

setLocale(window.vsCode.env.language === 'zh-cn' ? 'zh-CN' : window.vsCode.env.language, false);

export default props => {
  return <>{props.children}</>;
};
