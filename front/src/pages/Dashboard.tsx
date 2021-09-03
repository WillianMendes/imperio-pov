import React, { ChangeEvent, useEffect, useState } from 'react';

import {
  Button, Card, Form, Input, message, Modal, Result,
} from 'antd';

import {
  ArrowLeftOutlined,
  CloseOutlined,
  FallOutlined,
  PoweroffOutlined,
  ReconciliationOutlined,
  RiseOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  SyncOutlined,
  UserAddOutlined,
} from '@ant-design/icons';

import CardButton from '../components/CardButton';
import CardStats from '../components/CardStats';

import CashDeskService from '../services/CashDeskService';

import Admin from '../types/Admin';
import CashDesk from '../types/CashDesk';
import CashOperation from '../types/CashOperation';
import CashTypeOperation from '../types/enums/CashTypeOperation';

import UserSessionStorage from '../utils/UserSessionStorage';
import { formatterNumberWithoutPrefix, parserNumber } from '../utils/MaskCurrency';

import { ADMIN_URL_APP_DASHBOARD, ADMIN_URL_APP_NEW_SALE } from '../const/ROUTES_ADMIN';

const { Item } = Form;

function Dashboard() {
  const [user] = useState<Admin>(UserSessionStorage.getUserLogged());
  const [cashDesk, setCashDesk] = useState<CashDesk | undefined>();

  // Modal Open Cash
  const [modalOpenCashDeskVisibility, setModalOpenCashDeskVisibility] = useState<boolean>();
  const [initialValueOpenCash, setInitialValueOpenCash] = useState<string>('0');

  function showModalOpenCashDesk() {
    setModalOpenCashDeskVisibility(true);
  }

  function closeModalOpenCashDesk() {
    setModalOpenCashDeskVisibility(false);
  }

  function setCashDeskStateAndSession(cashDeskToSave: CashDesk) {
    setCashDesk(cashDeskToSave);
    sessionStorage.setItem('CashDesk', JSON.stringify(cashDeskToSave));
  }

  function setInitialValueOpenCashFormatted(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    const valueParsed = parserNumber(value).toString();
    setInitialValueOpenCash(valueParsed);
  }

  async function loadCashDeskActive() {
    message.info('Tentando carregar caixa da sessão anterior...');

    const cashDeskResponse = await CashDeskService.getCashDeskActive(user);

    if ('message' in cashDeskResponse) {
      message.error(cashDeskResponse.message);
    } else if ('operator' in cashDeskResponse) {
      setCashDeskStateAndSession(cashDeskResponse);
      message.success('Caixa ativo carregado!');
    }
  }

  async function handleOpenCashDesk() {
    const operationInitial: CashOperation = {
      description: 'Valor inicial',
      value: initialValueOpenCash,
      operation: CashTypeOperation.ADD,
    };

    const cashDeskResponse = await CashDeskService.openCashDesk(user, operationInitial);

    if ('message' in cashDeskResponse) {
      message.error(cashDeskResponse.message);

      if (cashDeskResponse.status === 406) {
        loadCashDeskActive().then();
      }
    } else if ('operator' in cashDeskResponse) {
      setCashDeskStateAndSession(cashDeskResponse);
    }
  }

  function renderModalOpenCashDesk() {
    return (
      <Modal title="Dinheiro em caixa" visible={modalOpenCashDeskVisibility} onOk={handleOpenCashDesk} onCancel={closeModalOpenCashDesk}>
        <Form layout="vertical">
          <Item initialValue={formatterNumberWithoutPrefix(initialValueOpenCash)}>
            <Input
              className="w-100"
              prefix="R$"
              onChange={setInitialValueOpenCashFormatted}
              placeholder="Qual a quantia inicial de dinheiro em caixa?"
              autoComplete="off"
              required
            />
          </Item>
        </Form>
      </Modal>
    );
  }

  useEffect(() => {
    const cashDeskOrNull = sessionStorage.getItem('CashDesk');
    if (cashDeskOrNull) setCashDesk(JSON.parse(cashDeskOrNull));
  }, []);

  if (!cashDesk) {
    return (
      <>
        { modalOpenCashDeskVisibility && renderModalOpenCashDesk() }
        <Result
          title={`Bem vindo(a) ${user?.fullName}!`}
          extra={(
            <Button type="primary" key="console" onClick={showModalOpenCashDesk}>
              Abrir Caixa
            </Button>
          )}
        />
      </>
    );
  }

  return (
    <Card style={{ margin: 0, padding: 0 }}>
      <CardStats text="Vendas do Dia" value="0" />
      <CardStats text="Receitas do Dia" value="R$0.00" />
      <CardStats text="Locações Atrasadas" value="0" />
      <CardStats text="Terminal 1" value={user?.fullName || 'Não logado'} />

      <CardButton text="Nova Venda" path={ADMIN_URL_APP_NEW_SALE} icon={<ShoppingCartOutlined />} />
      <CardButton text="Processar Devolução" path={ADMIN_URL_APP_DASHBOARD} icon={<ArrowLeftOutlined />} />
      <CardButton text="Cancelar Venda" path={ADMIN_URL_APP_DASHBOARD} icon={<CloseOutlined />} />
      <CardButton text="Receber Produtos" path={ADMIN_URL_APP_DASHBOARD} icon={<ReconciliationOutlined />} />

      <CardButton text="Nova Locação" path={ADMIN_URL_APP_DASHBOARD} icon={<ShoppingOutlined />} />
      <CardButton text="Receber Aluguel" path={ADMIN_URL_APP_DASHBOARD} icon={<ArrowLeftOutlined />} />
      <CardButton text="Finalizar Aluguel" path={ADMIN_URL_APP_DASHBOARD} icon={<CloseOutlined />} />
      <CardButton text="Cadastrar Cliente" path={ADMIN_URL_APP_DASHBOARD} icon={<UserAddOutlined />} />

      <CardButton text="Fechar Caixa" path={ADMIN_URL_APP_DASHBOARD} icon={<PoweroffOutlined />} />
      <CardButton text="Realizar Balanço" path={ADMIN_URL_APP_DASHBOARD} icon={<SyncOutlined />} />
      <CardButton text="Inserir Dinheiro" path={ADMIN_URL_APP_DASHBOARD} icon={<RiseOutlined />} />
      <CardButton text="Retirar Dinheiro" path={ADMIN_URL_APP_DASHBOARD} icon={<FallOutlined />} />
    </Card>
  );
}

export default Dashboard;
