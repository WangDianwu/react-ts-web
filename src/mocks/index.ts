import Mock from 'mockjs';
import authApi from './mockdata/menudate';

function _handerApi(apis:any) {
  Object.keys(apis).forEach(key => {
    const api = apis[key];
    Mock.mock(api.path, api.method, api.success);
  });
}

export default {
  startMock() {
    Mock.setup({
      timeout: 0 - 300
    });
    _handerApi(authApi);
  }
};
