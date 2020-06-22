import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

export default class ContentLayout extends React.Component<any,any> {
//   constructor(props) {
//     super(props);
//     this.state = {
//       company: '',
//       recored: ''
//     };
//   }
  render() {
    const { children } = this.props;
    return (
      <Layout
        style={{
          padding: '10px 10px 3px 10px',
        }}
      >
        <Content id='content' className='content'>
          {children}
        </Content>
      </Layout>
    );
  }
}
