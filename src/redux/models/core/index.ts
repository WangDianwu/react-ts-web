import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import {
  combineReducers,
  compose,
  applyMiddleware,
  createStore as _createStore
} from 'redux';

import getReducer from './reducer';
import getSaga from './saga';
import createStore from './createStore';
import { createHashHistory } from 'history';
let history = createHashHistory();

const only:any = [];
const except:any = [];

const onError = (err:any, extension:any) => {
  if (err) {
    if (typeof err === 'string') {
      err = new Error(err);
    }
    err.preventDefault = () => {
      err._dontReject = true;
    };
    throw new Error(err.stack || err);
  }
};

function onEffect(effect:any, { put }:any, model:any, actionType:any) {
  const { namespace } = model;
  if (
    (only.length === 0 && except.length === 0) ||
    (only.length > 0 && only.indexOf(actionType) !== -1) ||
    (except.length > 0 && except.indexOf(actionType) === -1)
  ) {
    return function*(...args:any) {
      yield effect(...args);
    };
  }
  return effect;
}

const sagas:any = [];
const reducers:any = {};

export function configuration(models:any = [], initialState:any = {}) {
  for (const m of models) {
    reducers[m.namespace] = getReducer(m.namespace, m.reducers, m.state);
    if (m.effects) {
      sagas.push(getSaga(m.effects, m, onError, [onEffect]));
    }
  }

  function createReducer() {
    return combineReducers(reducers);
  }

  const sagaMiddleware = createSagaMiddleware();


  const extraMiddleware = routerMiddleware(history);

  const store:any = createStore({
    reducers: createReducer(),
    initialState,
    sagaMiddleware,
    extraMiddleware
  });

  store.runSaga = sagaMiddleware.run;

  if (sagas.length === 1) {
    store.runSaga(sagas[0]);
  } else {
    sagas.forEach(sagaMiddleware.run);
  }

  return store;
}
