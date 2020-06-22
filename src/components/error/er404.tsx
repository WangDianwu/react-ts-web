import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

export default class NoExist extends React.Component {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Result
        status='404'
        title='404'
        subTitle='Sorry, the page you visited does not exist.'
        // extra={
        //   <Button type='primary'>
        //     <Link to={{ pathname: '/', state: { parent: null, child: null } }}>
        //       首页
        //     </Link>
        //   </Button>
        // }
      />
    );
  }
}
