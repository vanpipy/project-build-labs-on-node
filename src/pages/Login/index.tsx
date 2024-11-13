import * as React from 'react';
import { Button, Divider, Form, Input, Space, message } from 'antd';
import { createLoginService, getAuthService, LOGIN_PATHNAME } from '@/services/login.service';
import VerifyWithCode from '@/components/VerifyWithCode';
import './style.scss';

const Login = () => {
  const [phone, setPhone] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const [form] = Form.useForm();
  const onPhoneChange = (event: any) => {
    setPhone(event.target.value);
  };
  const onSubmit = async () => {
    setSubmitting(true);
    try {
      const result = await form.validateFields();
      const { phone, vcode } = result;
      const loginService = await createLoginService();
      const response = await loginService.loginWithPhoneCode({ phone, vcode });
      const { data: currentUser = {} } = response || {};
      const { token = '', authKey = [], bindShopCode, id } = currentUser as Record<string, any>;
      const authService = getAuthService();
      authService.login({ token, authKeys: authKey, shopCode: bindShopCode, id });
      authService.return({ fallbackUrl: '/' });
    } catch (err) {
      console.error(err);
    }
    setSubmitting(false);
  };
  return (
    <div className="login-view">
      <div className="login-view__bg-image">
        <img
          alt="巽风"
          src="https://static-test.xunfeng.cn/fe/partner-merchant-fe/assets/20241105140248/bgcolor-17fada11.png"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div className="login-view__container">
          <div className="login-view__header">
            <Space>
              <img
                alt="巽风"
                src="https://yewuzhongtai-test-cdn.xunfeng.cn/bucket_yewuzhongtai-test/platform-gateway/universal/1854051127250341889/logo.png"
                style={{ width: 24, height: 24 }}
              />
              <span style={{ fontSize: 18 }}>巽风数字世界</span>
            </Space>
            <h2 style={{ fontSize: 36, fontWeight: 'bold', margin: '5px 0 16px 0' }}>商家管理系统</h2>
            <Divider />
          </div>
          <div className="login-view__body">
            <h3 className="login-view__phone-title">手机号登录</h3>
            <Form form={form}>
              <Form.Item
                name="phone"
                rules={[{ required: true, pattern: /^1[0-9]{10}$/, message: '请输入正确的手机号' }]}
              >
                <Input size="large" placeholder="请输入手机号" onChange={onPhoneChange} />
              </Form.Item>
              <Form.Item name="vcode">
                <VerifyWithCode phone={phone} />
              </Form.Item>
            </Form>
          </div>
          <div className="login-view__footer">
            <Button type="primary" block size="large" onClick={onSubmit} loading={submitting}>
              登录
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const detectLoginStatus = async () => {
  const authService = getAuthService();
  const needToLogin = await authService.detectNeedLoginOrNot();
  const isLoginPage = window.location.pathname === LOGIN_PATHNAME;
  if (needToLogin && !isLoginPage) {
    message.error('登录状态已过期，请重新登录');
    window.setTimeout(() => {
      authService.locateLoginPage();
    }, 3000);
  }
};

export default Login;
