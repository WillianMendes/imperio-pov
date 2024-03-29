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
import CashOperation from '../types/CashOperation';
import CashTypeOperation from '../types/enums/CashTypeOperation';

import UserSessionStorage from '../utils/UserSessionStorage';
import { formatterNumber, formatterNumberWithoutPrefix, parserNumber } from '../utils/MaskCurrency';

import { ADMIN_URL_APP_CASH_DESK_CLOSE, ADMIN_URL_APP_DASHBOARD, ADMIN_URL_APP_NEW_SALE } from '../const/ROUTES_ADMIN';

import CashDeskContext from '../store/CashDesk/CashDeskContext';
import Sale from '../types/Sale';
import CashOperationService from '../services/CashOperationService';

const { Item } = Form;

function Dashboard() {
  // User
  const [user] = useState<Admin>(UserSessionStorage.getUserLogged());
  const { cashDesk, setCashDesk } = useContext(CashDeskContext);

  // Modal Open Cash
  const [modalOpenCashDeskVisibility, setModalOpenCashDeskVisibility] = useState<boolean>();
  const [initialValueOpenCash, setInitialValueOpenCash] = useState<string>('0');

  // Modal Insert/Remove Operation
  const [modalOpenOperationCashVisibility, setModalOperationCashVisibility] = useState<boolean>();
  const [cashOperation, setCashOperation] = useState<CashOperation>({ operation: CashTypeOperation.ADD, value: '0', description: '' });
  const [descriptionOperationCash, setDescriptionOperationCash] = useState<string>('');
  const [valueOperationCash, setValueOperationCash] = useState<string>('0');

  // Redirect
  const [isRedirectToClosedCashDesk, setIsRedirectToClosedCashDesk] = useState<boolean>(false);

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

    const totalValue = cashDesk.sales
      .reduce((totalSale: number, sale: Sale) => totalSale + sale.totalValue, 0);

    return formatterNumber(totalValue);
  }

  function handleShowModalOpenCashDesk() {
    setModalOpenCashDeskVisibility(true);
  }

  function handleCloseModalOpenCashDesk() {
    setModalOpenCashDeskVisibility(false);
  }

  function handleShowModalOperationCash(operationType: CashTypeOperation) {
    setDescriptionOperationCash('');
    setValueOperationCash('0');

    setCashOperation((prevState) => ({
      ...prevState,
      operation: operationType,
      cashDesk,
    }));
    setModalOperationCashVisibility(true);
  }

  function handleCloseModalOperationCash() {
    setDescriptionOperationCash('');
    setValueOperationCash('0');
    setModalOperationCashVisibility(false);
  }

  async function handleLoadCashDeskActive() {
    message.info('Tentando carregar caixa da sessão anterior...');

    const cashDeskResponse = await CashDeskService.getCashDeskActive(user);

    if ('message' in cashDeskResponse) {
      message.error(cashDeskResponse.message);
    } else if ('operator' in cashDeskResponse) {
      setCashDesk(cashDeskResponse);
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
      setCashDesk(cashDeskResponse);
    }

    handleCloseModalOpenCashDesk();
  }

  async function closeCashDesk() {
    const cashDeskResponse = await CashDeskService.getCashDeskActive(user);

    if ('message' in cashDeskResponse) {
      message.error(cashDeskResponse.message);
    } else if ('operator' in cashDeskResponse) {
      setCashDesk(cashDeskResponse);
      setIsRedirectToClosedCashDesk(true);
    }
  }

  async function handleNewOperationCash() {
    if (descriptionOperationCash === '' || valueOperationCash === '0') {
      message.error('Os campos descrição e valor são obrigatários.');
      return;
    }

    const cashOperationOther: CashOperation = {
      cashDesk,
      description: descriptionOperationCash,
      value: parserNumber(valueOperationCash).toString(),
      operation: cashOperation.operation,
    };

    const cashOperationResponse = await CashOperationService.save(cashOperationOther);

    if (!('status' in cashOperationResponse)) {
      message.error(cashOperationResponse.message);
    } else if (cashOperationResponse.status !== 201) {
      message.error('Erro ao realizar a operação.');
    } else {
      message.success('Operação realizada com sucesso.');
    }

    handleCloseModalOperationCash();
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

  function renderModalOperationCashDesk() {
    if (!cashOperation) throw new Error('CashOperation is void');

    const placeholder = cashOperation.operation === CashTypeOperation.ADD ? 'Quantia de dinheiro adicionada no caixa...' : 'Quantia de dinheiro retirada do caixa...';

    return (
      <Modal title="Operação de Caixa" visible={modalOpenOperationCashVisibility} onOk={handleNewOperationCash} onCancel={handleCloseModalOperationCash}>
        <Form layout="vertical">
          <Item required>
            <Input
              className="w-100"
              onChange={
                (e: ChangeEvent<HTMLInputElement>) => setDescriptionOperationCash(e.target.value)
              }
              placeholder="Descrição da operação"
              autoComplete="off"
              required
            />
          </Item>
          <Item initialValue={formatterNumberWithoutPrefix('0')} required>
            <Input
              className="w-100"
              prefix="R$"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setValueOperationCash(e.target.value)}
              placeholder={placeholder}
              autoComplete="off"
              required
            />
          </Item>
        </Form>
      </Modal>
    );
  }

  useEffect(() => {
    if (cashDesk.id === 0) return;

    CashDeskService.getCashDeskActive(user).then((cashDeskResponse) => {
      if ('sales' in cashDeskResponse && 'operations' in cashDeskResponse) {
        if (cashDeskResponse.sales?.length !== cashDesk.sales?.length
          || cashDeskResponse.operations?.length !== cashDesk.operations?.length) {
          setCashDesk(cashDeskResponse);
        }
      }
    });
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
    <>
      { modalOpenOperationCashVisibility && renderModalOperationCashDesk() }
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
        <CardButton text="Realizar Balanço" onClick={closeCashDesk} path="#" icon={<SyncOutlined />} />
        <CardButton text="Inserir Dinheiro" onClick={() => handleShowModalOperationCash(CashTypeOperation.ADD)} path="#" icon={<RiseOutlined />} />
        <CardButton text="Retirar Dinheiro" onClick={() => handleShowModalOperationCash(CashTypeOperation.REMOVE)} path="#" icon={<FallOutlined />} />
      </Card>
    </>
  );
}

export default Dashboard;
