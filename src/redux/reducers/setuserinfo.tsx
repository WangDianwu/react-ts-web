import * as types from '../store/actionsypes'
import { AnyAction } from 'redux'


// 定义state
export interface User_InfoState{
    userinfo:any
}

// 初始化 state
const initialState : User_InfoState ={
    userinfo:'user'
}

export default function (state:User_InfoState =initialState,action:AnyAction){
    switch(action.type)
    {
        case types.SET_USERINFO:
            return  {userinfo:action.payload}
        default:
            return state;
    }
}


