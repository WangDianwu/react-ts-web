import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer as _persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import createEncryptor from 'redux-persist-transform-encrypt';
// 加密,解密key
 const CRYPTO_KEY = 'MsWfgwghu9qJOGIN';

// redux 缓存key
 const REDUX_KEY = 'xlD70mAkVPDj';

const encryptor = createEncryptor({
  secretKey: CRYPTO_KEY,
  onError: function(error:any) {
    // Handle the error.
  }
});

const persistConfig:any = {
  key: REDUX_KEY,
  storage: storage,
  stateReconciler: autoMergeLevel2,
  transforms: [encryptor]
};

export default function({
  reducers,
  initialState,
  sagaMiddleware,
  extraMiddleware
}:any) {
  const persistReducer = _persistReducer(persistConfig, reducers);

  const store = createStore(
    persistReducer,
    initialState,
    composeWithDevTools(applyMiddleware(sagaMiddleware, extraMiddleware))
  );

  return store;
}
