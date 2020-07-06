import { combineReducers, ReducersMapObject, AnyAction, Reducer } from 'redux'
import { connectRouter, RouterState } from 'connected-react-router'
import history from './history'
import setuser ,{User_InfoState} from './setuserinfo'
import setmenu ,{MenuState} from './setmenu'

export interface ComState {
  setuser:User_InfoState,
  setmenu:MenuState
}

const reducers:ReducersMapObject<ComState,any> = {
  setuser,
  setmenu
}

const reducer: Reducer<ComState, AnyAction> = combineReducers(reducers)

export default reducer