import React from 'react';
import ReactDom from 'react-dom';
import store  from './redux/store/index';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd'; // 引入ConfigProvider全局化配置
import zhCN from 'antd/es/locale/zh_CN'; // 引入中文包
import { PersistGate } from 'redux-persist/integration/react'; // 持久化数据存储
import { persistStore } from 'redux-persist'; // 持久化数据存储
import ErrorCompontent from './components/error/index';  // 错误页
import RouteComponent from './router/index';

const persistor = persistStore(store); // 持久化数据存储


ReactDom.render (
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ErrorCompontent>
        <RouteComponent />,
        </ErrorCompontent>
      </PersistGate>
    </Provider>
  </ConfigProvider>,
  document.getElementById('root')
);
