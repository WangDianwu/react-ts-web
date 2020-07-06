import { createStore ,applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import { routerMiddleware } from 'connected-react-router'


import reducer from '../reducers/index';
import history from '../reducers/history'

const storeEnhancer = applyMiddleware(thunk, routerMiddleware(history))
const storeEnhancerCreator = storeEnhancer(createStore)
const store = storeEnhancerCreator(reducer)

export default store