import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Button, message, PageHeader, Space, Table,
} from 'antd';

import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

import Product from '../types/Product';
import ProductService from '../services/ProductService';
import { formatterNumber } from '../utils/MaskCurrency';

function Products() {
  const { Column } = Table;

  // Data
  const [products, setProducts] = useState<Product[]>();

  // Loading
  const [loading, setLoading] = useState<boolean>(false);

  async function getProducts() {
    setLoading(true);
    const result = await ProductService.listAll();
    if ('content' in result) setProducts(result.content);
    setLoading(false);
  }

  async function deleteProduct(code: number) {
    const result = await ProductService.delete(code);

    if (result.status === 204) {
      message.success('O produto foi apagado.');
      getProducts().then();
    } else if ('message' in result) message.error(result.message);
  }

  useEffect(() => {
    getProducts().then();
  }, []);

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

  function renderTable() {
    return (
      <Table dataSource={products} loading={loading} style={{ marginTop: 32 }}>
        <Column title="Nome" dataIndex="name" key="firstName" />
        <Column title="Preço de Custo" dataIndex="priceCost" key="priceCost" render={(value) => formatterNumber(value)} />
        <Column title="Preço de Venda" dataIndex="priceSell" key="priceSell" render={(value) => formatterNumber(value)} />
        <Column title="Estoque" dataIndex="quantity" key="quantity" />
        <Column title="Medida" dataIndex="measurement" key="measurement" />
        <Column
          title="Sob Demanda"
          dataIndex="isOnDemand"
          key="isOnDemand"
          render={(value) => (value ? <CheckOutlined /> : <CloseOutlined />)}
        />
        <Column
          title="Ações"
          key="action"
          render={(value) => (
            <Space size="middle">
              <Link to={`/product/update/${value.code}`}>Alterar</Link>
              <Link to="/product" onClick={() => deleteProduct(value.code)}>Excluir</Link>
            </Space>
          )}
        />
      </Table>
    );
  }

  return (
    <div style={{ padding: 32 }}>
      <PageHeader title="Produtos" extra={getButtonNewProduct()} />
      { products && renderTable() }
    </div>
  );
}

export default Products;
