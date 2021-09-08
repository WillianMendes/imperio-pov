import React, { FC } from 'react';

import { Col, Row, Table } from 'antd';

import CashDesk from '../types/CashDesk';
import { formatterNumber } from '../utils/MaskCurrency';
import CashTypeOperation from '../types/enums/CashTypeOperation';

interface CashDeskProps {
  location: {
    state: CashDesk
  }
}

const { Column } = Table;

const ClosedCashDesk: FC<CashDeskProps> = ({ location }) => {
  const { state } = location;
  return (
    <Row style={{ padding: 32 }}>
      <Col span={10} style={{ padding: '0 32px 0 0' }}>
        <h1>Movimentações</h1>
        <Table dataSource={state.operations} pagination={false} scroll={{ x: true, y: 2000 }}>
          <Column title="Descrição" key="description" dataIndex="description" />
          <Column title="Valor" key="value" dataIndex="value" render={(value) => formatterNumber(value)} />
          <Column
            title="Operação"
            key="operation"
            dataIndex="operation"
            render={(value) => (value === CashTypeOperation.ADD ? 'Adicionou' : 'Removeu')}
          />
        </Table>
      </Col>
      <Col span={10}>
        <h1>Vendas</h1>
      </Col>
      <Col span={4}>
        <h1>Resumo</h1>
      </Col>
    </Row>
  );
};

export default ClosedCashDesk;
