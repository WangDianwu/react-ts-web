import React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import { Redirect, Link } from 'react-router-dom';
import Header from './header';
import Menu from './menu';
import Content from './content';

export default class Master extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

  render() {
    const { children } = this.props;
    return (
      <Layout
        style={{
          height: '100%'
        }}
      >
        <Header />
        <Layout
          style={{
            height: '100%'
          }}
        >
          <Menu />
          <Content {...this.props}>{children}</Content>
        </Layout>
      </Layout>
    );
  }
}
