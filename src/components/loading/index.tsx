import React from 'react';
import NProgress from 'nprogress';
import { Skeleton, Result, Button } from 'antd';
interface Props{
  isLoading: boolean;
  error: any;
  pastDelay: any; 
  timedOut: any;
  retry: any;

}

export default class Loading extends React.Component<Props> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {};
  }

  onReload = () => {
    window.location.reload();
  };

  render() {
     const { isLoading, error } = this.props;
    const code = `(加载失败)`;
    const message = `加载资源失败)`;
    return (
      <div
        style={{
          height: '100%',
          margin: '0 auto',
        }}
      >
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
      </div>
    );
  }
}
