import * as types from '../store/actionsypes'
import { AnyAction } from 'redux'


// 定义state
export interface MenuState{
    menu:any
}

// 初始化 state
const initialState : MenuState ={
    menu:'user'
}

export default function (state:MenuState =initialState,action:AnyAction){
    switch(action.type)
    {
        case types.SET_MENU:
            return  {menu:action.payload}
        default:
            return state;
    }
}


