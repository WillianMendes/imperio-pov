import React from 'react';

import { Card } from 'antd';

import {
  ArrowLeftOutlined, CloseOutlined, FallOutlined, PoweroffOutlined, ReconciliationOutlined,
  RiseOutlined, ShoppingCartOutlined, ShoppingOutlined, SyncOutlined, UserAddOutlined,
} from '@ant-design/icons';

import CardButton from '../components/CardButton';
import CardStats from '../components/CardStats';

function Dashboard() {
  return (
    <Card style={{ margin: 0, padding: 0 }}>
      <CardStats text="Vendas do Dia" value="0" />
      <CardStats text="Receitas do Dia" value="R$0.00" />
      <CardStats text="Locações Atrasadas" value="0" />
      <CardStats text="Terminal 1" value="Willian Mendes" />
      <CardButton text="Nova Venda" path="/nova-venda" icon={<ShoppingCartOutlined style={{ fontSize: '32px', color: '#08c' }} />} />
      <CardButton text="Processar Devolução" path="/nova-venda" icon={<ArrowLeftOutlined style={{ fontSize: '32px', color: '#08c' }} />} />
      <CardButton text="Cancelar Venda" path="/nova-venda" icon={<CloseOutlined style={{ fontSize: '32px', color: '#08c' }} />} />
      <CardButton text="Receber Produtos" path="/nova-venda" icon={<ReconciliationOutlined style={{ fontSize: '32px', color: '#08c' }} />} />
      <CardButton text="Nova Locação" path="/nova-venda" icon={<ShoppingOutlined style={{ fontSize: '32px', color: '#08c' }} />} />
      <CardButton text="Receber Aluguel" path="/nova-venda" icon={<ArrowLeftOutlined style={{ fontSize: '32px', color: '#08c' }} />} />
      <CardButton text="Finalizar Aluguel" path="/nova-venda" icon={<CloseOutlined style={{ fontSize: '32px', color: '#08c' }} />} />
      <CardButton text="Cadastrar Cliente" path="/nova-venda" icon={<UserAddOutlined style={{ fontSize: '32px', color: '#08c' }} />} />
      <CardButton text="Fechar Caixa" path="/nova-venda" icon={<PoweroffOutlined style={{ fontSize: '32px', color: '#08c' }} />} />
      <CardButton text="Realizar Balanço" path="/nova-venda" icon={<SyncOutlined style={{ fontSize: '32px', color: '#08c' }} />} />
      <CardButton text="Inserir Dinheiro" path="/nova-venda" icon={<RiseOutlined style={{ fontSize: '32px', color: '#08c' }} />} />
      <CardButton text="Retirar Dinheiro" path="/nova-venda" icon={<FallOutlined style={{ fontSize: '32px', color: '#08c' }} />} />
    </Card>
  );
}

export default Dashboard;
