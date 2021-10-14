import { setLocale } from 'umi';

require('./index.less');

setLocale('zh-CN', false);

export default props => {
  return <>{props.children}</>;
};
