import React, { useEffect, useState, FC } from 'react';
import { Link } from 'react-router-dom';

import {
  Button, Input, message, PageHeader, Space, Table, Tag,
} from 'antd';

import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

import Pageable from '../types/Pageable';
import Product from '../types/Product';

import ProductService from '../services/ProductService';

import { formatterNumber } from '../utils/MaskCurrency';
import UserSessionStorage from '../utils/UserSessionStorage';

const { Column } = Table;

const Products: FC = () => {
  // Input
  const [term, setTerm] = useState<string>('');

  // Data
  const [products, setProducts] = useState<Pageable<Product>>();

  // Loading
  const [loading, setLoading] = useState<boolean>(false);

  async function loadProducts(page: number = 0, name: string | undefined = '') {
    setLoading(true);

    let result;
    if (name && name !== '') result = await ProductService.listByName(name, page);
    else result = await ProductService.listAll(page);

    if ('content' in result) setProducts(result);
    else if ('message' in result) message.error(result.message);
    else message.error('Não foi possível carregar os produtos.');

    setLoading(false);
  }

  async function deleteProduct(code: number) {
    const result = await ProductService.delete(code);

    if (result.status === 204) {
      message.success('O produto foi apagado.');
      loadProducts().then();
    } else if ('message' in result) message.error(result.message);
  }

  function pagination(current: number) {
    if (term && term !== '') loadProducts(current - 1, term).then();
    else loadProducts(current - 1).then();
  }

  useEffect(() => {
    loadProducts().then();
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
        onSearch={(value) => loadProducts(0, value)}
        placeholder="Nome do produto..."
        required
        loading={loading}
      />
    );
  }

  function getTagTotalProducts() {
    let phrase;

    if (products && products.totalElements <= 0) phrase = 'Nenhum produto encontrado';
    else if (products) phrase = `${products.totalElements} produtos encontrados.`;

    return (
      <Tag color={products && products?.totalElements > 0 ? 'green' : 'red'}>
        { phrase }
      </Tag>
    );
  }

  function pageHeaderExtra() {
    return (
      <Space>
        { getTagTotalProducts() }
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
        { UserSessionStorage.getUserLogged()?.level === 'Admin'
          && (
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
          )}
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
};

export default Products;
