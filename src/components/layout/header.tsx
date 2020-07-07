/* eslint-disable import/no-dynamic-require */
import React from 'react';
import { Layout, Button, Input } from 'antd';
import './style.scss'

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { LOGOUT } from '../../redux/models/auth'

const { Search } = Input;
const { Header } = Layout;

 class HeaderLayout extends React.Component<any, any> {
    constructor(props:any) {
      super(props);
      this.state = {
      };
    }
  onClick =() => {
    const { dispatch  } = this.props
    dispatch({type:LOGOUT,payload:''})
  }

  render() {
    return (
      <Layout>
        <Header className="header">
          <div className="logo" />
          <div className='head-msg'>
            <span>个人信息</span>
            <Button type="primary" onClick={this.onClick} >退出</Button>
          </div>
        </Header>
      </Layout>
    );
  }
}
export default  connect(({ global, auth}:any)=>({
  ...global,
  ...auth
}))(HeaderLayout)
