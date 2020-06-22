import Loadable from 'react-loadable'; // 打包代码分割
import Loading from '../../../components/loading/index';

const LOADING_DELAY = 2000;

export default (routersConf: any[]) => {
  return routersConf.map(i => {
    i.component = Loadable({
      delay: LOADING_DELAY,
      loader: i.loader,
      loading: Loading
    });
    return i;
  });
};
