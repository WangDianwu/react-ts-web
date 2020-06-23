/* eslint-disable import/no-dynamic-require */
import React from 'react';
import { Layout, Menu, Dropdown, Row, Col, Avatar, Input } from 'antd';
import './style.scss'

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const { Search } = Input;
const { Header } = Layout;



export default class HeaderLayout extends React.Component<any, any> {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       userInfo: localStorage.getItem('userInfo'),
  //       platType: ''
  //     };
  //   }
  render() {
    return (
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
      </Layout>
    );
  }
}
