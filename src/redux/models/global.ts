// reducers types
export const SET_BREAD = 'SET_BREAD';
export const SET_TABS = 'SET_TABS';
// effects types

export default {
  namespace: 'global',
  state: {
    breadCrumb: null,
    tabs: []
  },
  reducers: {
    [SET_BREAD](state:any, action:any) {
      return {
        ...state,
        loading: false,
        breadCrumb: action.payload
      };
    }
  },
  effects: {}
};
