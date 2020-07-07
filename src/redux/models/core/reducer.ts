// 部分代码参考dav.js
import { noop } from '../../../utils/is';

// 获取reducer 处理方法
function handleAction(namespace:any, actionType:any, reducer:any = noop) {
  return (state:any, action:any) => {
    if (actionType === action.type) {
      return reducer(state, action);
    }
    return state;
  };
}

// reducers 处理
function reduceReducers(...reducers:any) {
  return (state:any, action:any) => reducers.reduce((p:any, r:any) => r(p, action), state);
}

function handleActions(namespace:any, handlers:any, defaultState:any) {
  const reducers = Object.keys(handlers).map(type => {
    return handleAction(namespace, type, handlers[type]);
  });
  const reducer = reduceReducers(...reducers);
  return (state = defaultState, action:any) => reducer(state, action);
}

export default function getReducer(namespace:any, reducers:any, state:any) {
  return handleActions(namespace, reducers || {}, state);
}
