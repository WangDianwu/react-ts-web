import { AntAnchor } from "antd/lib/anchor/Anchor";

// reducers types
export const SET_USERINFO = 'SET_USERINFO';
export const SET_MENU = 'SET_MENU';
export const RELOAD_USERINFO = 'RELOAD_USERINFO';

// effects types
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const GET_MENU = 'GET_MENU';

export default {
  namespace: 'auth',
  state: {
    userInfo: localStorage.getItem('userInfo'),
    menu: []
  },
  reducers: {
    [SET_USERINFO](state:any, action:any) {
      return {
        ...state,
        loading: false,
        userInfo: action.payload
      };
    },
    [SET_MENU](state:any, action:any) {
      return {
        ...state,
        loading: false,
        menu: action.payload
      };
    }
  },
  effects: {
    *[LOGIN]({ payload }:any, { call, put }:any) {
      try {
        yield put({ type: SET_USERINFO, payload: payload });
      } catch (e) {
      }
    },
    *[LOGOUT]({ payload }:any, { call, put }:any) {
      yield put({ type: SET_USERINFO, payload: null });
      yield put({ type: SET_MENU, payload: null });
      document.title = 'React+Typescript'
    },
    *[GET_MENU]({ payload }:any, { call, put }:any) {
      const parm = payload;
    },
  }
};
