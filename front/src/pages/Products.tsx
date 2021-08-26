import React from 'react';

import {
  Button, PageHeader, Space, Table,
} from 'antd';
import { Link } from 'react-router-dom';

function Products() {
  const { Column } = Table;

  const data = [
    {
      key: '1',
      name: 'Area Fina',
      priceCoast: '12.75',
      priceSale: '14.99',
      stock: '50',
      measurement: 'Metros Cubicos',
      onDemand: 'Sim',
    },
    {
      key: '2',
      name: 'Area Grossa',
      priceCoast: '10.24',
      priceSale: '12.99',
      stock: '90',
      measurement: 'Metros Cubicos',
      onDemand: 'Sim',
    },
    {
      key: '3',
      name: 'Parafuso 3/4',
      priceCoast: '0.99',
      priceSale: '1.29',
      stock: '500',
      measurement: 'Unidades',
      onDemand: 'Não',
    },
  ];

  function getButtonNewProduct() {
    return (
      <Link to="/product/register">
        <Button
          type="primary"
          size="middle"
          htmlType="button"
        >
          Novo Produto
        </Button>
      </Link>
    );
  }

  return (
    <div style={{ padding: 32 }}>
      <PageHeader title="Produtos" extra={getButtonNewProduct()} />
      <Table dataSource={data} style={{ marginTop: 32 }}>
        <Column title="Nome" dataIndex="name" key="firstName" />
        <Column title="Preço de Custo" dataIndex="priceCoast" key="priceCoast" />
        <Column title="Preço de Venda" dataIndex="priceSale" key="priceSale" />
        <Column title="Estoque" dataIndex="stock" key="stock" />
        <Column title="Medida" dataIndex="measurement" key="measurement" />
        <Column title="Sob Demanda" dataIndex="onDemand" key="onDemand" />
        <Column
          title="Action"
          key="action"
          render={() => (
            <Space size="middle">
              <Link to="/">Alterar</Link>
              <Link to="/">Excluir</Link>
            </Space>
          )}
        />
      </Table>
    </div>
  );
}

export default Products;
