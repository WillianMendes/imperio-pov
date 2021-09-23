import React, { FC, useContext, useState } from 'react';

import {
  Button, Card, Col, message, Row, Space, Table,
} from 'antd';

import { Redirect } from 'react-router-dom';

import CashDeskService from '../services/CashDeskService';

import { formatterNumber } from '../utils/MaskCurrency';

import CashTypeOperation from '../types/enums/CashTypeOperation';
import PaymentMethod from '../types/enums/PaymentMethod';
import CashOperation from '../types/CashOperation';
import Sale from '../types/Sale';

import { ADMIN_URL_APP_DASHBOARD } from '../const/ROUTES_ADMIN';

import CashDeskContext, { DEFAULT_VALUE_CASH_DESK } from '../store/CashDesk/CashDeskContext';

const { Column } = Table;

const ClosedCashDesk: FC = () => {
  const { cashDesk, setCashDesk } = useContext(CashDeskContext);

  const [redirectToDashboard, setRedirectToDashboard] = useState<boolean>(false);

  function handleDisplayCash(value: PaymentMethod) {
    switch (value) {
      case PaymentMethod.CASH:
        return 'Dinheiro';
      case PaymentMethod.CREDIT_CARD:
        return 'Cartão de Credito';
      case PaymentMethod.DEBIT_CARD:
        return 'Cartão de Debito';
      default:
        return 'Whops! Ocorreu um erro.';
    }
  }

  function handleDisplayTime(value: string | Date) {
    const date = new Date(value);
    return new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' }).format(date);
  }

  async function handleCloseCashDesk() {
    const response = await CashDeskService.closeCashDesk(cashDesk.operator);

    if ('message' in response) {
      message.error(message);
    } else if ('closed' in response) {
      message.success('Caixa fechado com sucesso.');
      setCashDesk(DEFAULT_VALUE_CASH_DESK.cashDesk);
      setRedirectToDashboard(true);
    }
  }

  function getTotalValueOperation(typeOperation: CashTypeOperation, typing: boolean = false) {
    if (!cashDesk.operations) return 'R$0,00';

    const totalValue = cashDesk.operations.reduce((total: number, operation: CashOperation) => {
      if (operation.operation === typeOperation) {
        return total + Number(operation.value);
      }
      return total;
    }, 0);

    if (typing) {
      return totalValue;
    }

    return totalValue > 0 ? formatterNumber(totalValue) : 'R$0,00';
  }

  function getTotalSales() {
    if (!cashDesk.sales) return 'R$0,00';

    const totalValue = cashDesk.sales
      .reduce((total: number, sale: Sale) => total + sale.totalValue, 0);

    return formatterNumber(totalValue);
  }

  function getTotalSalesCash() {
    if (!cashDesk.sales) return 'R$0,00';

    let totalValue = cashDesk.sales
      .reduce((total: number, sale: Sale) => {
        if (sale.paymentMethod === PaymentMethod.CASH) {
          return total + sale.totalValue;
        }
        return total;
      }, 0);

    const operationsAdd = getTotalValueOperation(CashTypeOperation.ADD, true);
    const operationsOut = getTotalValueOperation(CashTypeOperation.REMOVE, true);
    totalValue += (Number(operationsAdd) - Number(operationsOut));

    return formatterNumber(totalValue);
  }

  function getPaginationOperationsOptions() {
    return { total: cashDesk.operations?.length, pageSize: 10 };
  }

  function getPaginationSalesOptions() {
    return { total: cashDesk.sales?.length, pageSize: 10 };
  }

  if (redirectToDashboard) {
    return <Redirect to={ADMIN_URL_APP_DASHBOARD} />;
  }

  return (
    <Row style={{ padding: 32 }}>
      <Col span={9} style={{ padding: '0 16px 0 0' }}>
        <h1>Movimentações</h1>
        <Table dataSource={cashDesk.operations} pagination={getPaginationOperationsOptions()}>
          <Column title="Descrição" key="description" dataIndex="description" />
          <Column title="Valor" key="value" dataIndex="value" render={(value) => formatterNumber(value)} />
          <Column
            title="Operação"
            key="operation"
            dataIndex="operation"
            render={(value) => (value === CashTypeOperation.ADD ? 'Entrada' : 'Saída')}
          />
        </Table>
      </Col>
      <Col span={10} style={{ padding: '0 16px 0 0' }}>
        <h1>Vendas</h1>
        <Table dataSource={cashDesk.sales} pagination={getPaginationSalesOptions()}>
          <Column title="Valor" key="totalValue" dataIndex="totalValue" render={(value) => formatterNumber(value)} />
          <Column title="Pagamento" key="paymentMethod" dataIndex="paymentMethod" render={(value) => handleDisplayCash(value)} />
          <Column title="Horário" key="created" dataIndex="created" render={(value: string) => handleDisplayTime(value)} />
        </Table>
      </Col>
      <Col span={5}>
        <h1>Resumo</h1>
        <Card className="card__closed_cash_desk">
          <h3>Entradas</h3>
          <p>{ getTotalValueOperation(CashTypeOperation.ADD) }</p>
        </Card>
        <Card className="card__closed_cash_desk">
          <h3>Saídas</h3>
          <p>{ getTotalValueOperation(CashTypeOperation.REMOVE) }</p>
        </Card>
        <Card className="card__closed_cash_desk">
          <h3>Vendas</h3>
          <p>{ getTotalSales() }</p>
        </Card>
        <Card className="card__closed_cash_desk">
          <h3>Dinheiro em Caixa</h3>
          <p>{ getTotalSalesCash() }</p>
        </Card>
        <Space className="buttons__closed_cash_desk">
          <Button type="primary" onClick={handleCloseCashDesk} danger>Fechar Caixa</Button>
          <Button type="default" onClick={() => setRedirectToDashboard(true)}>Cancelar</Button>
        </Space>
      </Col>
    </Row>
  );
};

export default ClosedCashDesk;
