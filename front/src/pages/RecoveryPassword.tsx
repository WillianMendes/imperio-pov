import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import {
  Button, Col, Form, Input, Layout, message, Modal, Result, Row, Statistic, Steps,
} from 'antd';
import { Content } from 'antd/lib/layout/layout';

import {
  CodeOutlined, ExclamationCircleOutlined, EyeInvisibleOutlined, EyeTwoTone, LockOutlined,
  MailOutlined, SendOutlined,
} from '@ant-design/icons';

import AdminService from '../services/AdminService';

function RecoveryPassword() {
  // Inputs
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordRepeat, setPasswordRepeat] = useState<string>('');

  // Buttons
  const [returnButtonIsDisabled, setReturnButtonIsDisabled] = useState<boolean>(true);

  // Loadings
  const [loading, setLoading] = useState<boolean>(false);
  const [countDownIsVisible, setCountDownIsVisible] = useState<boolean>(true);

  // Redirects
  const [redirectToLogin, setRedirectToLogin] = useState<boolean>(false);

  // Others
  const [step, setStep] = useState<number>(0);

  // Variables
  const deadline = Date.now() + 10 * 1000;

  // ANT Const
  const { Item } = Form;
  const { Step } = Steps;
  const { Countdown } = Statistic;
  const { warning } = Modal;

  function validatePassword() {
    if (password.length <= 0 || passwordRepeat.length <= 0) return false;
    if (password.length < 8 || passwordRepeat.length < 8) return false;
    return password === passwordRepeat;
  }

  async function validateStepZero() {
    const response = await AdminService.sendMailRecoveryPassword(email);

    if (response !== false && response !== true) {
      if ('message' in response) message.error(response.message);
      else message.error('Ops! Ocorreu algum problema desconhecido, tente enviar o e-mail novamente.');
    } else if (response) setStep(1);
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
  }

  async function validateStepTwo(values: any) {
    if (!validatePassword()) message.error('As senhas informadas são diferentes, digite a mesma senha nos dois campos');

    const { code } = values;
    const response = await AdminService.changePassword(code, email, password);

    if (response.status === 200) {
      setStep(3);
    } else if ('message' in response) {
      message.error(response.message);
    } else {
      message.error('Ops! Ocorreu um erro desconhecido, solicite outro token e tente novamente!');
    }
  }

  function validateStepThree() {
    setRedirectToLogin(true);
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
        await validateStepTwo(values);
        break;
      case 3:
        await validateStepThree();
        break;
      default:
        message.error('Ops! Aconteceu algum problema estranho!');
    }
    setLoading(false);
  }

  function finishedCountDown() {
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
  }

  function returnToStepZero() {
    message
      .info('Informe o mesmo e-mail que foi utilizado para se cadastrar e fazer login.', 10)
      .then();
    setStep(0);
  }

  function getSubmitButton(disabled: boolean = false) {
    return (
      <Button type="primary" icon={<SendOutlined />} loading={loading} htmlType="submit" disabled={disabled}>
        Avançar
      </Button>
    );
  }

  function getStepZero() {
    return (
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
  }

  function getStepOne() {
    return (
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
  }

  function getStepTwo() {
    return (
      <>
        <Item
          label="Nova senha"
          name="password"
          tooltip="A senha deve ter pelo menos 8 caracteres."
          wrapperCol={{ md: 24 }}
        >
          <Input.Password
            size="large"
            placeholder="Digite sua nova senha"
            prefix={<LockOutlined />}
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            disabled={loading}
            required
            minLength={8}
          />
        </Item>
        <Item
          label="Confirmar nova senha"
          name="passwordRepeat"
          tooltip="Repita a senha novamente, exatamente como no campo anterior."
          wrapperCol={{ md: 24 }}
        >
          <Input.Password
            size="large"
            placeholder="Digite sua nova senha novamente"
            prefix={<LockOutlined />}
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            onChange={(event) => setPasswordRepeat(event.target.value)}
            value={passwordRepeat}
            disabled={loading}
            required
            minLength={8}
          />
        </Item>
        {getSubmitButton(!validatePassword())}
      </>
    );
  }

  function getStepThree() {
    return (
      <Result
        status="success"
        title="Senha alterada com sucesso!"
        subTitle="Agora você pode entrar no sistema novamente utilizando o mesmo e-mail e sua nova senha."
        extra={[
          <Button type="primary" key="login" htmlType="submit">
            Entrar no sistema
          </Button>,
        ]}
      />
    );
  }

  // Umount States
  useEffect(() => () => {}, []);

  if (redirectToLogin) return <Redirect to="/login" />;

  return (
    <Layout>
      <Content className="px-4 py-4 h-100vh">
        <Row justify="center" align="middle" gutter={5}>
          <Col span="24">
            <Steps current={step}>
              <Step title="E-mail" />
              <Step title="Autenticação" />
              <Step title="Nova senha" />
              <Step title="Sucesso" />
            </Steps>
          </Col>
          <Col span="24" className="mt-4">
            <Form name={`formStep${step}`} layout="vertical" onFinish={onFinishSuccess}>
              {step === 0 && getStepZero()}
              {step === 1 && getStepOne()}
              {step === 2 && getStepTwo()}
              {step === 3 && getStepThree()}
            </Form>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default RecoveryPassword;
