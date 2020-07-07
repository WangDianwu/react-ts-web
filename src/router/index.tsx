import React, { Props } from 'react';
import {
  Switch,
  HashRouter as Router,
  Redirect,
} from 'react-router-dom';
 import Layout from '../components/layout/index';
import { connect } from 'react-redux';
import { WHITE_LIST} from '../constants/index';
import getRoutes from './core/index';

// @connect(({ global, auth }) => {
//   return {
//     ...global,
//     ...auth
//   };
// })
class RouteComponent extends React.Component<any,any> {
  render() {
    return (
      <Router>
        <Switch>
          <AuthRoute {...this.props} />
        </Switch>
      </Router>
    );
  }
}

export default connect(({ global, auth}:any)=>({
      ...global,
      ...auth
    }))(RouteComponent)


class AuthRoute extends React.Component <any,any> {
  render() {
    const { location, userInfo } = this.props;
    const { pathname, search } = location;
    // props 传递的不准 重新获取
    let isLogin = true;
    if (userInfo == null) {
      isLogin = false;
    }
    // 登陆状态下，输入登陆路由
    if (!isLogin && pathname !== '/login') {
      return <Redirect to='/login' />;
    }
    // 登陆状态下，输入登陆路由
    if (isLogin && pathname === '/login') {
      return <Redirect to='/' />;
    }
    // 未登录状态下，输入私有路由以外的路由
    if (!isLogin && WHITE_LIST.filter(i => i === pathname).length > 0) {
      return (
        <div style={{
            height: '100%'
          }}
        >
          {getRoutes(false)}
        </div>
      );
    }
    // 登陆状态 私有路由
    if (isLogin) {
      return <PermissionRoute {...this.props} />;
    }
    return <Redirect to = '/login' />;
  }
}

class PermissionRoute extends React.Component<any,any> {
  render() {
    return <Layout {...this.props}>{getRoutes()}</Layout>;
  }
}
