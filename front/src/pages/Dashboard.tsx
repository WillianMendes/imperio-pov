import React, {
  ChangeEvent, useContext, useEffect, useState,
} from 'react';
import { Redirect } from 'react-router-dom';

import {
  Button, Card, Form, Input, message, Modal, Result, Space,
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
import { formatterNumber, formatterNumberWithoutPrefix, parserNumber } from '../utils/MaskCurrency';

import { ADMIN_URL_APP_CASH_DESK_CLOSE, ADMIN_URL_APP_DASHBOARD, ADMIN_URL_APP_NEW_SALE } from '../const/ROUTES_ADMIN';

import CashDeskContext from '../store/CashDesk/CashDeskContext';

const { Item } = Form;

function Dashboard() {
  // User
  const [user] = useState<Admin>(UserSessionStorage.getUserLogged());
  const { cashDesk, setCashDesk } = useContext(CashDeskContext);

  // Modal Open Cash
  const [modalOpenCashDeskVisibility, setModalOpenCashDeskVisibility] = useState<boolean>();
  const [initialValueOpenCash, setInitialValueOpenCash] = useState<string>('0');

  // Redirect
  const [isRedirectToClosedCashDesk, setIsRedirectToClosedCashDesk] = useState<boolean>(false);

  function setCashDeskStateAndSession(cashDeskToSave: CashDesk) {
    setCashDesk(cashDeskToSave);
    sessionStorage.setItem('CashDesk', JSON.stringify(cashDeskToSave));
  }

  function setInitialValueOpenCashFormatted(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    const valueParsed = parserNumber(value).toString();
    setInitialValueOpenCash(valueParsed);
  }

  function getTotalSales(): number {
    if (!cashDesk.sales) return 0;

    return cashDesk.sales.length;
  }

  function getTotalSalesCurrency(): string {
    if (!cashDesk.sales) return 'R$ 0,00';

    const totalValue = cashDesk.sales.reduce((totalSale, sale) => sale.totalValue, 0);
    return formatterNumber(totalValue);
  }

  function handleShowModalOpenCashDesk() {
    setModalOpenCashDeskVisibility(true);
  }

  function handleCloseModalOpenCashDesk() {
    setModalOpenCashDeskVisibility(false);
  }

  async function handleLoadCashDeskActive() {
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
    } else if ('operator' in cashDeskResponse) {
      setCashDeskStateAndSession(cashDeskResponse);
    }

    handleCloseModalOpenCashDesk();
  }

  async function closeCashDesk() {
    const cashDeskResponse = await CashDeskService.getCashDeskActive(user);

    if ('message' in cashDeskResponse) {
      message.error(cashDeskResponse.message);
    } else if ('operator' in cashDeskResponse) {
      setCashDeskStateAndSession(cashDeskResponse);
      setIsRedirectToClosedCashDesk(true);
    }
  }

  function renderModalOpenCashDesk() {
    return (
      <Modal title="Dinheiro em caixa" visible={modalOpenCashDeskVisibility} onOk={handleOpenCashDesk} onCancel={handleCloseModalOpenCashDesk}>
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

  if (cashDesk.id === 0) {
    return (
      <>
        { modalOpenCashDeskVisibility && renderModalOpenCashDesk() }
        <Result
          title={`Bem vindo(a) ${user?.fullName}!`}
          extra={(
            <Space>
              <Button type="primary" key="console" onClick={handleShowModalOpenCashDesk}>
                Abrir Caixa
              </Button>
              <Button type="default" key="console" onClick={handleLoadCashDeskActive}>
                Carregar Caixa Ativo
              </Button>
            </Space>
          )}
        />
      </>
    );
  }

  if (isRedirectToClosedCashDesk) {
    return (
      <Redirect to={{
        pathname: ADMIN_URL_APP_CASH_DESK_CLOSE,
        state: cashDesk,
      }}
      />
    );
  }

  return (
    <Card style={{ margin: 0, padding: 0 }}>
      <CardStats text="Vendas do Dia" value={getTotalSales().toString()} />
      <CardStats text="Receitas do Dia" value={getTotalSalesCurrency()} />
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

      <CardButton text="Fechar Caixa" onClick={closeCashDesk} path="#" icon={<PoweroffOutlined />} />
      <CardButton text="Realizar Balanço" path={ADMIN_URL_APP_DASHBOARD} icon={<SyncOutlined />} />
      <CardButton text="Inserir Dinheiro" path={ADMIN_URL_APP_DASHBOARD} icon={<RiseOutlined />} />
      <CardButton text="Retirar Dinheiro" path={ADMIN_URL_APP_DASHBOARD} icon={<FallOutlined />} />
    </Card>
  );
}

export default Dashboard;
