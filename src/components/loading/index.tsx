import React from 'react';
import NProgress from 'nprogress';
import { Skeleton, Result, Button } from 'antd';

export default class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onReload = () => {
    window.location.reload();
  };

  render() {
    const { isLoading, error } = this.props;
    let content = (
      <Skeleton
        style={{
          height: '100%',
        }}
      />
    );
    if (isLoading) {
      NProgress.start();
    }
    if (!isLoading) {
      content = null;
      NProgress.done();
    }
    if (error != null) {
      const code = `${error.code}(加载失败)`;
      const message = `${error.message}(加载资源失败)`;
      content = (
        <Result
          status='error'
          title={code}
          subTitle={message}
          extra={
            <Button type='primary' onClick={this.onReload}>
              重新加载
            </Button>
          }
        />
      );
      NProgress.done();
    }
    return (
      <div
        style={{
          height: '100%',
          margin: '0 auto',
        }}
      >
        {content}
      </div>
    );
  }
}
