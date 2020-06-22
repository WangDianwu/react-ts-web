/* eslint-disable import/no-dynamic-require */
import React from 'react';
import { Layout, Menu, Dropdown, Row, Col, Avatar, Input } from 'antd';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const { Search } = Input;
const { Header } = Layout;

export default
class HeaderLayout extends React.Component<any,any> {
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
        <Header className='header' style={{ padding: '0 50px 0 25px' }}>
          <Row>
            <Col span={3}>
              <div className='logo'>测试</div>
            </Col>
            <Col span={4} />
            <Col span={4} />
            <Col span={3} className='col-right'>
              <a
                className='ant-dropdown-link userName'
                style={{
                  color: '#E5E5E5',
                  margin: '0 20px 0 0',
                  float: 'right',
                  cursor: 'auto',
                }}
              >
               测试
              </a>
            </Col>
          </Row>
        </Header>
      </Layout>
    );
  }
}
