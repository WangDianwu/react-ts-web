// 常量

// 路由白名单
export const WHITE_LIST = ['/login','/','/home']; 


interface Model {
  code:number,
  message:string,
  data:any
}
// mock
// 默认错误
export const COMMON_ERROR:Model = {
    code: -1,
    message: '网络连接出错',
    data: null
  };
  
  // 默认成功
  export const COMMON_SUCCESS:Model = {
    code: 200,
    message: '操作成功',
    data: []
  };
  
