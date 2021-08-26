import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import {
  Breadcrumb, Button, Col, Form, Input, InputNumber, message, PageHeader, Row, Select, Space,
  Switch,
} from 'antd';

import { CloseOutlined, SaveOutlined } from '@ant-design/icons';

import Product from '../types/Product';
import { formatterNumber, parserNumber } from '../utils/MaskCurrency';
import ProductService from '../services/ProductService';

function ProductRegister() {
  const { Option } = Select;
  const { Item } = Form;

  // Inputs
  const [priceCost, setPriceCost] = useState<string>();
  const [priceSell, setPriceSell] = useState<string>();

  // Loading
  const [loading, setLoading] = useState<boolean>(false);

  // Redirect
  const [redirectToProduct, setRedirectToProduct] = useState<boolean>(false);

  async function saveProduct(values: any) {
    setLoading(true);

    const product: Product = {
      name: values.name,
      priceCost: parserNumber(values.priceCost),
      priceSell: parserNumber(values.priceSell),
      quantity: values.quantity,
      measurement: values.measurement,
      isOnDemand: values.isOnDemand,
    };

    const result = await ProductService.save(product);

    if (result && 'name' in result) {
      message.success(`O produto ${result.name} foi cadastrado com sucesso!`);
      setRedirectToProduct(true);
    } else if (result && 'message' in result) {
      message.error(result.message);
    }

    setLoading(false);
  }

  if (redirectToProduct) return <Redirect to="/product" />;

  return (
    <div style={{ padding: 32 }}>
      <PageHeader title="Cadastrar Produto">
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
      </PageHeader>
      <Form layout="vertical" style={{ width: '100%', marginTop: 16 }} onFinish={(values) => saveProduct(values)}>
        <Row gutter={24}>
          <Col span="24">
            <Item label="Nome" name="name" wrapperCol={{ span: 24 }}>
              <Input required autoComplete="off" />
            </Item>
          </Col>
          <Col span="12">
            <Item label="Preço de Custo" name="priceCost" help={formatterNumber(priceCost)} wrapperCol={{ span: 24 }}>
              <Input
                style={{ width: '100%' }}
                prefix="R$"
                onChange={(e) => setPriceCost(e.target.value)}
                autoComplete="off"
                required
              />
            </Item>
          </Col>
          <Col span="12">
            <Item label="Preço de Venda" name="priceSell" help={formatterNumber(priceSell)} wrapperCol={{ span: 24 }}>
              <Input
                style={{ width: '100%' }}
                prefix="R$"
                onChange={(e) => setPriceSell(e.target.value)}
                autoComplete="off"
                required
              />
            </Item>
          </Col>
          <Col span="12">
            <Item label="Estoque" name="quantity" wrapperCol={{ span: 24 }}>
              <InputNumber min="0" max="1000000" step="1" style={{ width: '100%' }} required />
            </Item>
          </Col>
          <Col span="12">
            <Item label="Medida" name="measurement" required wrapperCol={{ span: 24 }}>
              <Select style={{ width: '100%' }} defaultActiveFirstOption>
                <Option value="UN">Unidades</Option>
                <Option value="KG">Quilogramas</Option>
                <Option value="M2">Metros Quadrados</Option>
                <Option value="M3">Metros Cubicos</Option>
                <Option value="M">Metros</Option>
              </Select>
            </Item>
          </Col>
          <Col span="12">
            <Item label="Apenas Sob Demanda" name="isOnDemand" initialValue={false} valuePropName="checked" required wrapperCol={{ span: 24 }}>
              <Switch />
            </Item>
          </Col>
          <Col span="12">
            <Space>
              <Button type="primary" htmlType="submit" loading={loading} icon={<SaveOutlined />}>Registrar</Button>
              <Button type="default" disabled={loading} icon={<CloseOutlined />}>Cancelar</Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default ProductRegister;
