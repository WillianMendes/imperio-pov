import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Button, Input, message, PageHeader, Space, Table,
} from 'antd';

import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

import Pageable from '../types/Pageable';
import Product from '../types/Product';
import ProductService from '../services/ProductService';
import { formatterNumber } from '../utils/MaskCurrency';

function Products() {
  const { Column } = Table;

  // Input
  const [term, setTerm] = useState<string>('');

  // Data
  const [products, setProducts] = useState<Pageable<Product>>();

  // Mode Table
  const [searchMode, setSearchMode] = useState<boolean>();

  // Loading
  const [loading, setLoading] = useState<boolean>(false);

  async function getProducts(page: number = 0) {
    setLoading(true);
    setSearchMode(false);
    const result = await ProductService.listAll(page);
    if ('content' in result) setProducts(result);
    setLoading(false);
  }

  async function findProducts(name: string, page: number = 0) {
    setLoading(true);
    setSearchMode(true);
    const result = await ProductService.listByName(name, page);
    if ('content' in result) setProducts(result);
    setLoading(false);
  }

  async function deleteProduct(code: number) {
    const result = await ProductService.delete(code);

    if (result.status === 204) {
      message.success('O produto foi apagado.');
      getProducts().then();
    } else if ('message' in result) message.error(result.message);
  }

  function pagination(current: number) {
    if (searchMode === false) getProducts(current - 1).then();
    if (searchMode === true) findProducts(term, current - 1).then();
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

  function getInputSearch() {
    return (
      <Input.Search
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        onSearch={(value) => findProducts(value)}
        required
      />
    );
  }

  function pageHeaderExtra() {
    return (
      <Space>
        { getInputSearch() }
        { getButtonNewProduct() }
      </Space>
    );
  }

  function renderTable() {
    return (
      <Table
        dataSource={products?.content}
        loading={loading}
        pagination={{
          total: products && products.totalElements,
          current: products && products.number + 1,
          pageSize: products && products.size,
          onChange: (current) => pagination(current),
        }}
        style={{ marginTop: 32 }}
      >
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
      <PageHeader
        title="Produtos"
        extra={pageHeaderExtra()}
      />
      { products && renderTable() }
    </div>
  );
}

export default Products;
