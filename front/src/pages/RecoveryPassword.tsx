import React, { useEffect, useState } from 'react';

import {
  Button, Col, Form, Input, Layout, message, Row, Steps,
} from 'antd';
import { MailOutlined, SendOutlined } from '@ant-design/icons';
import { Content } from 'antd/lib/layout/layout';

import AdminService from '../services/AdminService';

const RecoveryPassword = () => {
  // Inputs
  const [email, setEmail] = useState<string>('');

  // Loadings
  const [loading, setLoading] = useState<boolean>(false);

  // Others
  const [step, setStep] = useState<number>(0);

  // ANT Const
  const { Item } = Form;
  const { Step } = Steps;

  async function validateStepZero() {
    const response = await AdminService.sendMailRecoveryPassword(email);

    if (response !== false && response !== true) {
      if (response === undefined) message.error('Ops! Houve um erro no servidor, tente novamente mais tarde!');
      if ('message' in response) message.error(response.message);
    } else if (response) {
      setStep(1);
    }
  }

  async function onFinishSuccess() {
    setLoading(true);
    switch (step) {
      case 0:
        await validateStepZero();
        break;
      case 1:
        break;
      case 2:
        break;
      default:
        message.error('Ops! Aconteceu algum problema estranho!');
    }
    setLoading(false);
  }

  const getSubmitButton = (disabled: boolean = false) => (
    <Button type="primary" icon={<SendOutlined />} loading={loading} htmlType="submit" disabled={disabled}>
      Avançar
    </Button>
  );

  const getStepZero = () => (
    <>
      <Item label="E-mail" name="email" wrapperCol={{ md: 24 }}>
        <Input
          type="email"
          size="large"
          placeholder="Insira seu e-mail"
          prefix={<MailOutlined />}
          disabled={loading}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </Item>
      {getSubmitButton()}
    </>
  );

  // Umount States
  useEffect(() => () => {}, []);

  return (
    <Layout>
      <Content className="px-4 py-4 h-100vh">
        <Row justify="center" align="middle" gutter={5}>
          <Col span="24">
            <Steps current={step}>
              <Step title="E-mail" />
              <Step title="Autenticação" />
              <Step title="Nova senha" />
            </Steps>
          </Col>
          <Col span="24" className="mt-4">
            <Form name={`formStep${step}`} layout="vertical" onFinish={onFinishSuccess}>
              {step === 0 && getStepZero()}
            </Form>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default RecoveryPassword;
