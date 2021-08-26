import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import {
  Button, Col, Form, Input, message, Row,
} from 'antd';

import {
  EyeInvisibleOutlined, EyeTwoTone, LockOutlined, SendOutlined, MailOutlined,
} from '@ant-design/icons';
import AdminService from '../services/AdminService';

function Login() {
  const [form] = Form.useForm();

  // inputs
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // loadings
  const [loading, setLoading] = useState<boolean>(false);

  // Redirects
  const [redirectToDashboard, setRedirectToDashboard] = useState<boolean>(false);

  async function validateLogin() {
    if (email.length < 8 || password.length < 8) return;

    setLoading(true);
    const response = await AdminService.login(email, password);

    if (response) {
      if ('message' in response) message.error(response.message);
      else if (response.email === email) {
        sessionStorage.setItem('login', JSON.stringify(response));
        setRedirectToDashboard(true);
      }
    } else message.error('Ops! Ocorreu um problema desconhecido, tente entrar novamente!');

    setLoading(false);
  }

  async function onFinish() {
    await validateLogin();
  }

  // Umount States
  useEffect(() => () => {}, []);

  if (redirectToDashboard) return <Redirect to="/dashboard" />;

  return (
    <div className="w-100vw h-100vh" style={{ backgroundColor: 'steelblue' }}>
      <Row justify="center" align="middle" className="h-100vh">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          scrollToFirstError
          wrapperCol={{ md: 24 }}
          className="box--login"
        >
          <Form.Item
            label="E-mail"
            name="email"
            rules={[
              { required: true, message: 'Insira seu e-mail antes de continuar!' },
              { type: 'email', message: 'O e-mail digitado é invalido!' },
            ]}
            wrapperCol={{ md: 24 }}
          >
            <Input
              type="email"
              size="large"
              placeholder="Insira seu e-mail"
              prefix={<MailOutlined />}
              onChange={(event) => setEmail(event.target.value)}
              disabled={loading}
            />
          </Form.Item>
          <Form.Item
            label="Senha"
            name="password"
            rules={[{ required: true, message: 'Insira sua senha antes de continuar!' }]}
            wrapperCol={{ md: 24 }}
          >
            <Input.Password
              size="large"
              placeholder="Insira sua senha"
              prefix={<LockOutlined />}
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              onChange={(event) => setPassword(event.target.value)}
              disabled={loading}
            />
          </Form.Item>
          <Row gutter={16}>
            <Col span="24" className="mt--3 mb-3 flex-end">
              <Link to="/recovery">
                <Button
                  type="link"
                  size="small"
                  htmlType="button"
                  style={{ paddingRight: 0 }}
                  disabled={loading}
                >
                  Esqueci minha senha
                </Button>
              </Link>
            </Col>
            <Col span="12">
              <Button
                type="primary"
                icon={<SendOutlined />}
                loading={loading}
                htmlType="submit"
                style={{ width: '100%' }}
              >
                Entrar
              </Button>
            </Col>
            <Col span="12">
              <Button type="default" disabled={loading} style={{ width: '100%' }}>
                Cadastrar
              </Button>
            </Col>
          </Row>
        </Form>
      </Row>
    </div>
  );
}

export default Login;
