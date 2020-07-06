import { COMMON_ERROR as error, COMMON_SUCCESS as success } from '../../constants';

import queryData from './menudate'

export default {
    login: {
      path: 'test/api/login',
      method: 'post',
      success() {
        const res = success;
        success.data = {
          username: '管理员',
          usertoken: 'usertoken',
          phone: '150****7168'
        }
        return res;
      },
      error() {
        const res = error;
        return res;
      }
    }
    // getmenu: {
    //     path: 'test/api/getmenu',
    //     method: 'get',
    //     success() {
    //       const res = success;
    //       success.data = queryData;
    //       return res;
    //     },
    //     error() {
    //       const res = error;
    //       return res;
    //     }
    //   }
  };