import React, { useEffect, useState } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';

import {
  Breadcrumb, Button, Col, Form, Input, InputNumber, message, PageHeader, Row, Select, Space,
  Spin,
  Switch,
} from 'antd';

import { CloseOutlined, SaveOutlined } from '@ant-design/icons';

import Product from '../types/Product';

import ProductService from '../services/ProductService';

import { formatterNumber, formatterNumberWithoutPrefix, parserNumber } from '../utils/MaskCurrency';

const { Option } = Select;
const { Item } = Form;

function ProductRegister() {
  // Data for Update
  const [product, setProduct] = useState<Product>();

  // Inputs
  const [priceCost, setPriceCost] = useState<string>();
  const [priceSell, setPriceSell] = useState<string>();

  // History
  // @ts-ignore
  const { code } = useParams();

  // Loading
  const [loading, setLoading] = useState<boolean>(false);

  // Redirect
  const [redirectToProduct, setRedirectToProduct] = useState<boolean>(false);

  async function getProduct() {
    setLoading(true);
    const result = await ProductService.findByCode(code);
    if (!('message' in result)) setProduct(result);
    setLoading(false);
  }

  async function saveProduct(values: any) {
    setLoading(true);

    let result;
    const newProduct: Product = {
      name: values.name,
      priceCost: parserNumber(values.priceCost),
      priceSell: parserNumber(values.priceSell),
      quantity: values.quantity,
      measurement: values.measurement,
      isOnDemand: values.isOnDemand,
    };

    if (code && product?.code) result = await ProductService.update(newProduct, product.code);
    else result = await ProductService.save(newProduct);

    if (result && 'name' in result) {
      message.success(`O produto ${result.name} foi cadastrado com sucesso!`);
      setRedirectToProduct(true);
    } else if (result && 'message' in result) {
      message.error(result.message);
    }

    setLoading(false);
  }

  useEffect(() => {
    if (code) getProduct().then();
  }, []);

  function renderSpin() {
    return (
      <Space
        align="center"
        style={{
          width: '100%', height: 'calc(100% - 128px)', display: 'flex', justifyContent: 'center', alignItems: 'center',
        }}
      >
        <Spin size="large" />
      </Space>
    );
  }

  function renderBreadCrumb() {
    return (
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/product">
            Produtos
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          Cadastrar Produto
        </Breadcrumb.Item>
      </Breadcrumb>
    );
  }

  function renderForm() {
    return (
      <Form layout="vertical" onFinish={(values) => saveProduct(values)} style={{ width: '100%', marginTop: 16 }}>
        <Row gutter={24}>
          <Col span="24">
            <Item label="Nome" name="name" initialValue={product?.name} wrapperCol={{ span: 24 }}>
              <Input required autoComplete="off" />
            </Item>
          </Col>
          <Col span="12">
            <Item label="Preço de Custo" name="priceCost" initialValue={formatterNumberWithoutPrefix(product?.priceCost)} help={formatterNumber(priceCost)} wrapperCol={{ span: 24 }}>
              <Input
                prefix="R$"
                onChange={(e) => setPriceCost(e.target.value)}
                autoComplete="off"
                required
                style={{ width: '100%' }}
              />
            </Item>
          </Col>
          <Col span="12">
            <Item label="Preço de Venda" name="priceSell" initialValue={formatterNumberWithoutPrefix(product?.priceSell)} help={formatterNumber(priceSell)} wrapperCol={{ span: 24 }}>
              <Input
                prefix="R$"
                onChange={(e) => setPriceSell(e.target.value)}
                autoComplete="off"
                required
                style={{ width: '100%' }}
              />
            </Item>
          </Col>
          <Col span="12">
            <Item label="Estoque" name="quantity" initialValue={product?.quantity} wrapperCol={{ span: 24 }}>
              <InputNumber step="1" required style={{ width: '100%' }} />
            </Item>
          </Col>
          <Col span="12">
            <Item label="Medida" name="measurement" initialValue={product?.measurement} required wrapperCol={{ span: 24 }}>
              <Select defaultValue="UN" defaultActiveFirstOption={product === undefined} style={{ width: '100%' }}>
                <Option value="UN">Unidades</Option>
                <Option value="KG">Quilogramas</Option>
                <Option value="M2">Metros Quadrados</Option>
                <Option value="M3">Metros Cubicos</Option>
                <Option value="M">Metros</Option>
              </Select>
            </Item>
          </Col>
          <Col span="12">
            <Item label="Apenas Sob Demanda" name="isOnDemand" initialValue={product?.isOnDemand || false} valuePropName="checked" required wrapperCol={{ span: 24 }}>
              <Switch />
            </Item>
          </Col>
          <Col span="12">
            <Space>
              <Button type="primary" htmlType="submit" loading={loading} icon={<SaveOutlined />}>Registrar</Button>
              <Button
                type="default"
                disabled={loading}
                icon={<CloseOutlined />}
                onClick={() => setRedirectToProduct(true)}
              >
                Cancelar
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    );
  }

  if (redirectToProduct) return <Redirect to="/product" />;

  return (
    <div style={{ padding: 32, height: '100%' }}>
      <PageHeader title="Cadastrar Produto" breadcrumbRender={renderBreadCrumb} />
      { (!code) || (code && !loading) ? renderForm() : renderSpin() }
    </div>
  );
}

export default ProductRegister;
