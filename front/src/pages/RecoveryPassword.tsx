import React, { useEffect, useState } from 'react';

import {
  Button, Col, Form, Input, Layout, message, Modal, Row, Statistic, Steps,
} from 'antd';
import {
  CodeOutlined, ExclamationCircleOutlined, MailOutlined, SendOutlined,
} from '@ant-design/icons';

import { Content } from 'antd/lib/layout/layout';
import AdminService from '../services/AdminService';

const RecoveryPassword = () => {
  // Inputs
  const [email, setEmail] = useState<string>('');

  // Buttons
  const [returnButtonIsDisabled, setReturnButtonIsDisabled] = useState<boolean>(true);

  // Loadings
  const [loading, setLoading] = useState<boolean>(false);
  const [countDownIsVisible, setCountDownIsVisible] = useState<boolean>(true);

  // Others
  const [step, setStep] = useState<number>(0);

  // Variables
  const deadline = Date.now() + 10 * 1000;

  // ANT Const
  const { Item } = Form;
  const { Step } = Steps;
  const { Countdown } = Statistic;
  const { warning } = Modal;

  async function validateStepZero() {
    const response = await AdminService.sendMailRecoveryPassword(email);

    if (response !== false && response !== true) {
      if (response === undefined) message.error('Ops! Houve um erro no servidor, tente novamente mais tarde!');
      if ('message' in response) message.error(response.message);
    } else if (response) {
      setStep(1);
    }
  }

  async function validateStepOne(values: any) {
    setCountDownIsVisible(false);
    const { code } = values;
    const response = await AdminService.verifyTokenRecoveryPassword(code, email);

    if (response !== false && response !== true) {
      if (response === undefined) message.error('Ops! Houve um erro no servidor, tente novamente mais tarde!');
      if ('message' in response) message.error(response.message);
    } else if (response) {
      setStep(2);
    } else if (!response) {
      message.error('Ops! O token informado já expirou, solicite outro novamente!');
    }

    setCountDownIsVisible(true);
  }

  async function onFinishSuccess(values: any) {
    setLoading(true);
    switch (step) {
      case 0:
        await validateStepZero();
        setReturnButtonIsDisabled(true);
        setCountDownIsVisible(true);
        break;
      case 1:
        await validateStepOne(values);
        break;
      case 2:
        break;
      default:
        message.error('Ops! Aconteceu algum problema estranho!');
    }
    setLoading(false);
  }

  const finishedCountDown = () => {
    setReturnButtonIsDisabled(false);
    setCountDownIsVisible(false);
    warning({
      title: 'Ainda não recebeu um e-mail com o código de confirmação?',
      icon: <ExclamationCircleOutlined />,
      content: (
        <div className="mt-3">
          <div>
            <p>
              Tente novamente.
            </p>
            <p>
              Tenha certeza que o e-mail informado
              <strong> é válido.</strong>
            </p>
            <p>
              Verifique sua
              <strong> caixa de entrada.</strong>
            </p>
            <p>
              Verifique sua
              <strong> caixa de spam.</strong>
            </p>
            <p>
              Caso tenha dificuldade, entre em contato com o
              <strong> administrador do sistema.</strong>
            </p>
          </div>
        </div>
      ),
    });
  };

  const returnToStepZero = () => {
    message
      .info('Informe o mesmo e-mail que foi utilizado para se cadastrar e fazer login.', 10)
      .then();
    setStep(0);
  };

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

  const getStepOne = () => (
    <>
      <Item label="Código" name="code" wrapperCol={{ md: 24 }}>
        <Input
          type="number"
          size="large"
          placeholder="Insira o código que você recebeu por e-mail"
          prefix={<CodeOutlined />}
          disabled={loading}
          required
        />
      </Item>
      {getSubmitButton()}
      <Button
        type="link"
        onClick={() => returnToStepZero()}
        htmlType="button"
        disabled={returnButtonIsDisabled}
      >
        Ainda não recebi o código
      </Button>
      <Col className="mt-3">
        {
          countDownIsVisible
          && <Countdown title="Tente novamente em" value={deadline} onFinish={finishedCountDown} format="mm:ss" />
        }
      </Col>
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
              {step === 1 && getStepOne()}
            </Form>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default RecoveryPassword;
