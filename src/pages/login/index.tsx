import React from 'react';
import './style.scss';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { connect, useDispatch } from 'react-redux';
import { LOGIN } from '../../redux/models/auth'
class LoginView extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      param:{
        username:'admin',
        userpwd:111111,
        remember:false
      }
    };
  }
  componentDidMount() {}

  onFinish = (val: any) => {
    const {dispatch } = this.props
    dispatch({type:LOGIN,payload:val})
  };

  render() {
    return (
      <Form
        name="normal_login"
        className="login-form"
        initialValues={this.state.param}
        onFinish={this.onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入账号!' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="账号"
          />
        </Form.Item>
        <Form.Item
          name="userpwd"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住密码</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            忘记密码
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            登陆
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default connect(({ global, auth}:any)=>({
  ...global,
  ...auth
}))(LoginView)
