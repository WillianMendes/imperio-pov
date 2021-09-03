import React, { FC, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import {
  Breadcrumb,
  Button,
  Card,
  Col,
  ConfigProvider,
  Divider,
  Drawer,
  Form,
  Input,
  InputNumber,
  List,
  message,
  Modal,
  PageHeader,
  Row,
  Select,
  Space,
  Table,
  Tag,
} from 'antd';

import {
  CheckOutlined, CloseOutlined, MinusOutlined, PlusOutlined,
} from '@ant-design/icons';

import Pageable from '../types/Pageable';
import Product from '../types/Product';
import ItemSale from '../types/ItemSale';

import ProductService from '../services/ProductService';

import { formatterNumber, parserNumber } from '../utils/MaskCurrency';

import { ADMIN_URL_APP_DASHBOARD } from '../const/ROUTES_ADMIN';

import { mountCoupon } from '../utils/PrintNonFiscalCoupon';
import Sale from '../types/Sale';
import PaymentMethod from '../types/enums/PaymentMethod';

const { Column } = Table;
const { Item } = Form;
const { Option } = Select;

const TYPE_REMOVE = 'remove';
const TYPE_MORE_ONE = 'more_one';
const TYPE_MINOR_ONE = 'minor_one';
const TYPE_CHANGE = 'change';

const customizeRenderEmpty = () => (
  <div style={{ textAlign: 'center' }}>
    <p style={{ fontSize: 20 }}>
      Carrinho vazio.
    </p>
  </div>
);

const NewSale: FC = () => {
  // Input
  const [term, setTerm] = useState<string>('');
  const [valueReceived, setValueReceived] = useState<string>();

  // Data
  const [products, setProducts] = useState<Pageable<Product>>();

  // Cart
  const [sale, setSale] = useState<Sale | undefined>({
    items: [], paymentMethod: PaymentMethod.CASH, totalValue: 0,
  });

  // Loading
  const [loading, setLoading] = useState<boolean>(false);

  // Modals
  const [modalQuantityIsVisible, setModalQuantityIsVisible] = useState<boolean>(false);
  const [itemSelected, setItemSelected] = useState<ItemSale | undefined>();

  // Drawer
  const [modalSaleFinishedIsVisible, setModalSaleFinishedIsVisible] = useState<boolean>(false);

  // Redirect
  const [redirectToDashboard, setRedirectToDashboard] = useState<boolean>(false);

  async function loadProducts(page: number = 0, name: string | undefined = '', size: number = 9) {
    setLoading(true);

    let result;
    if (name && name !== '') result = await ProductService.listByName(name, page, size);
    else result = await ProductService.listAll(page, size);

    if ('content' in result) setProducts(result);
    else if ('message' in result) message.error(result.message);
    else message.error('Não foi possível carregar os produtos.');

    setLoading(false);
  }

  function pagination(current: number) {
    if (term && term !== '') loadProducts(current - 1, term).then();
    else loadProducts(current - 1).then();
  }

  function handleProductRow(record: Product) {
    const isRepeat = sale?.items.some((item) => item.product.code === record.code);
    if (isRepeat) {
      message.error(`O produto ${record.name} já está no carrinho.`).then();
      return;
    }

    const item: ItemSale = {
      product: record,
      quantity: 1,
      unitaryValue: record.priceSell,
      totalValue: record.priceSell,
    };

    setItemSelected(item);
    setModalQuantityIsVisible(true);
  }

  function getSaleTotalValue(items: ItemSale[] | undefined = undefined) {
    let itemsCurrent = [];

    if (!sale) return 0;
    if (!items) itemsCurrent = sale.items;
    else itemsCurrent = items;

    return itemsCurrent.reduce((total, item) => (total + item.totalValue), 0);
  }

  function addCart(product: Product | undefined, quantity: number) {
    if (!product) return;

    if (quantity > product.quantity && !product.isOnDemand) {
      message.error(`Não há estoque suficiente para adicionar ${quantity} ${product.name} ao carrinho, a quantidade em estoque é de ${product.quantity}.`).then();
      return;
    }

    const item: ItemSale = {
      product,
      quantity,
      unitaryValue: product.priceSell,
      totalValue: product.priceSell * quantity,
    };

    setSale((prevItems) => {
      if (!prevItems) return undefined;
      const { items, paymentMethod } = prevItems;
      return {
        items: [...items, item],
        paymentMethod,
        totalValue: getSaleTotalValue([...items, item]),
      };
    });

    setModalQuantityIsVisible(false);
    setItemSelected(undefined);
  }

  function handleChangeQuantity(value: number, itemChanged: ItemSale): ItemSale {
    const { product } = itemChanged;

    if (value > product.quantity && !product.isOnDemand) {
      message.error(
        `Não foi possível adicionar ${value} ${product.name} ao carrinho, pois não há estoque suficiente.`,
      ).then();
      return itemChanged;
    }

    if (value < 1) {
      return { ...itemChanged, quantity: 1, totalValue: itemChanged.product.priceSell };
    }

    return { ...itemChanged, quantity: value, totalValue: itemChanged.product.priceSell * value };
  }

  function handleChangeMoreOneQuantity(itemChanged: ItemSale) {
    const { quantity, product } = itemChanged;
    const newQuantity = quantity + 1;

    if (newQuantity > product.quantity && !product.isOnDemand) {
      message.error(
        `Não foi possível adicionar ${newQuantity} ${product.name} ao carrinho, pois não há estoque suficiente.`,
      ).then();
      return itemChanged;
    }

    return {
      ...itemChanged,
      quantity: newQuantity,
      totalValue: newQuantity * product.priceSell,
    };
  }

  function handleChangeMinorOneQuantity(itemChanged: ItemSale) {
    const { quantity } = itemChanged;
    const newQuantity = (quantity - 1) > 1 ? (quantity - 1) : 1;

    return {
      ...itemChanged,
      quantity: newQuantity,
      totalValue: itemChanged.product.priceSell * newQuantity,
    };
  }

  function changeQuantity(type: string, codeItem: number | undefined, value: number = -1) {
    if (!sale) return;

    const codeItemIndex = sale.items.findIndex((item) => item.product.code === codeItem);
    const itemsSaleCopy = [...sale.items];
    const itemChanged = { ...itemsSaleCopy[codeItemIndex] };

    switch (type) {
      case TYPE_CHANGE:
        itemsSaleCopy[codeItemIndex] = handleChangeQuantity(value, itemChanged);
        break;
      case TYPE_MORE_ONE:
        itemsSaleCopy[codeItemIndex] = handleChangeMoreOneQuantity(itemChanged);
        break;
      case TYPE_MINOR_ONE:
        itemsSaleCopy[codeItemIndex] = handleChangeMinorOneQuantity(itemChanged);
        break;
      case TYPE_REMOVE:
        itemsSaleCopy.splice(codeItemIndex, 1);
        message.success(`O produto ${itemChanged.product.name} foi removido do carrinho.`);
        break;
      default:
        message.error('O produto não foi encontrado.').then();
    }

    setSale((prevItems) => {
      if (!prevItems) return undefined;

      const { paymentMethod } = prevItems;
      return {
        items: [...itemsSaleCopy],
        paymentMethod,
        totalValue: getSaleTotalValue(itemsSaleCopy),
      };
    });
  }

  function setPaymentMethod(value: string) {
    let paymentMethodValue: PaymentMethod;

    switch (value.toUpperCase()) {
      case PaymentMethod.CASH:
        paymentMethodValue = PaymentMethod.CASH;
        break;
      case PaymentMethod.CREDIT_CARD:
        paymentMethodValue = PaymentMethod.CREDIT_CARD;
        setValueReceived(sale?.totalValue.toString());
        break;
      case PaymentMethod.DEBIT_CARD:
        paymentMethodValue = PaymentMethod.DEBIT_CARD;
        setValueReceived(sale?.totalValue.toString());
        break;
      default:
        message.error('Metodo de pagamento invalido.').then();
    }

    setSale((prevState) => {
      if (!prevState) return undefined;

      return {
        ...prevState,
        paymentMethod: paymentMethodValue,
      };
    });
  }

  useEffect(() => {
    loadProducts().then();
  }, []);

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
        onRow={(record: Product) => ({
          onClick: () => handleProductRow(record), // click row
        })}
        style={{ paddingTop: '16px' }}
      >
        <Column title="Nome" dataIndex="name" key="firstName" />
        <Column title="Preço de Venda" dataIndex="priceSell" key="priceSell" render={(value) => formatterNumber(value)} />
        <Column title="Estoque" dataIndex="quantity" key="quantity" />
        <Column title="Medida" dataIndex="measurement" key="measurement" />
        <Column
          title="Sob Demanda"
          dataIndex="isOnDemand"
          key="isOnDemand"
          render={(value) => (value ? <CheckOutlined /> : <CloseOutlined />)}
        />
      </Table>
    );
  }

  function renderBreadCrumb() {
    return (
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={ADMIN_URL_APP_DASHBOARD}>
            Dashboard
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          Nova venda
        </Breadcrumb.Item>
      </Breadcrumb>
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

  function renderTagTotalProducts() {
    let phrase;

    if (products && products.totalElements <= 0) phrase = 'Nenhum produto encontrado';
    else if (products) phrase = `${products.totalElements} produtos encontrados.`;

    return (
      <Tag color={products && products?.totalElements > 0 ? 'green' : 'red'}>
        { phrase }
      </Tag>
    );
  }

  function renderHeaderExtra() {
    return (
      <Space>
        { renderTagTotalProducts() }
        { getInputSearch() }
      </Space>
    );
  }

  function renderListCart() {
    return (
      <div style={{ height: '616px', overflowX: 'auto' }}>
        <ConfigProvider renderEmpty={customizeRenderEmpty}>
          <List
            dataSource={sale?.items}
            renderItem={(item: ItemSale) => (
              <Card key={item.product.code} style={{ padding: '16px', marginBottom: '8px', borderRadius: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{item.product.name}</span>
                  <span>
                    {formatterNumber(item.product.priceSell)}
                    /
                    {item.product.measurement}
                  </span>
                </div>
                <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between' }}>
                  <InputNumber
                    min={0}
                    placeholder="Quantidade"
                    value={item.quantity}
                    onChange={
                    (value: number) => changeQuantity(TYPE_CHANGE, item.product.code, value)
                  }
                    style={{ width: '60%' }}
                  />
                  <Space>
                    <Button
                      type="primary"
                      onClick={() => changeQuantity(TYPE_REMOVE, item.product.code)}
                      size="small"
                      shape="circle"
                      icon={<CloseOutlined />}
                      danger
                    />
                    <Button
                      type="primary"
                      onClick={() => changeQuantity(TYPE_MINOR_ONE, item.product.code)}
                      size="small"
                      shape="circle"
                      icon={<MinusOutlined />}
                    />
                    <Button
                      type="primary"
                      onClick={() => changeQuantity(TYPE_MORE_ONE, item.product.code)}
                      size="small"
                      shape="circle"
                      icon={<PlusOutlined />}
                    />
                  </Space>
                </div>
              </Card>
            )}
          />
        </ConfigProvider>
      </div>
    );
  }

  function renderModalQuantity() {
    return (
      <Modal
        title={itemSelected?.product.name}
        visible={modalQuantityIsVisible}
        onOk={() => addCart(itemSelected?.product, itemSelected?.quantity || 1)}
        onCancel={() => setModalQuantityIsVisible(false)}
      >
        <Form layout="vertical">
          <Form.Item label="Quantidade">
            <InputNumber
              value={itemSelected?.quantity}
              min={1}
              max={itemSelected?.product.isOnDemand ? undefined : itemSelected?.product.quantity}
              placeholder="Digite a quantidade"
              onChange={(e: number) => setItemSelected(
                (prevState) => (prevState ? { ...prevState, quantity: e } : undefined),
              )}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Form>
      </Modal>
    );
  }

  function renderDrawerSaleFinished() {
    return (
      <Drawer
        title="Finalizar Venda"
        placement="right"
        width={600}
        onClose={() => setModalSaleFinishedIsVisible(false)}
        visible={modalSaleFinishedIsVisible}
      >
        <ConfigProvider renderEmpty={customizeRenderEmpty}>
          <Table
            dataSource={sale?.items}
            loading={loading}
            pagination={false}
            scroll={{ x: true, y: 2000 }}
          >
            <Column title="Nome" key="nameFinish" render={(value, record: ItemSale) => record.product.name} />
            <Column title="Quantidade" key="quantityFinish" render={(value, record: ItemSale) => `${record.quantity}/${record.product.measurement}`} />
            <Column title="Subtotal" key="subtotalFinish" render={(value, record: ItemSale) => formatterNumber(record.quantity * record.product.priceSell)} />
          </Table>
        </ConfigProvider>
        <Card style={{ marginTop: '32px', padding: '16px 16px 0 16px' }}>
          <Form layout="vertical">
            <Item label="Método de Pagamento">
              <Select
                defaultValue={sale?.paymentMethod}
                style={{ width: '100%' }}
                onSelect={(value: string) => setPaymentMethod(value)}
              >
                <Option value={PaymentMethod.CASH}>
                  Dinheiro
                </Option>
                <Option value={PaymentMethod.CREDIT_CARD}>
                  Cartão de Credito
                </Option>
                <Option value={PaymentMethod.DEBIT_CARD}>
                  Cartão de Debito
                </Option>
              </Select>
            </Item>
            {sale?.paymentMethod === PaymentMethod.CASH && (
              <Item label="Valor Recebido" name="valueReceived" initialValue={valueReceived}>
                <Input
                  prefix="R$"
                  onChange={(e) => setValueReceived(e.target.value)}
                  autoComplete="off"
                  placeholder="Digite a quantia de dinheiro recebida"
                  required
                  style={{ width: '100%' }}
                />
              </Item>
            )}
          </Form>
        </Card>
        <Card style={{ height: 'auto', marginTop: '16px', padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '16px' }}>
            <span>Valor Pago</span>
            <span>
              {sale?.paymentMethod === PaymentMethod.CASH
                ? formatterNumber(valueReceived) : formatterNumber(sale?.totalValue)}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '16px' }}>
            <span>Total a Pagar</span>
            <span>{formatterNumber(sale?.totalValue)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Troco</span>
            <span>{sale?.paymentMethod === PaymentMethod.CASH ? formatterNumber(Number(valueReceived) - parserNumber(sale.totalValue.toString())) : 'R$ 0'}</span>
          </div>
        </Card>
        <Button
          type="primary"
          onClick={() => mountCoupon(sale, valueReceived)}
          disabled={Number(valueReceived) < Number(sale?.totalValue)}
          style={{ width: '100%', marginTop: '32px' }}
        >
          Finalizar Compra
        </Button>
      </Drawer>
    );
  }

  if (redirectToDashboard) return <Redirect to={ADMIN_URL_APP_DASHBOARD} />;

  return (
    <div style={{ padding: '36px', height: '100vh' }}>
      { renderModalQuantity() }
      { renderDrawerSaleFinished() }
      <Row>
        <Col span={15}>
          <PageHeader title="Nova Venda" breadcrumbRender={renderBreadCrumb} extra={renderHeaderExtra()} />
          { renderTable() }
        </Col>
        <Col span={1}><Divider type="vertical" /></Col>
        <Col span={8}>
          <h1>Carrinho</h1>
          { renderListCart() }
          <Space style={{ marginTop: '16px', width: '100%' }}>
            <Button type="primary" onClick={() => setModalSaleFinishedIsVisible(true)} style={{ width: '100%' }}>Finalizar</Button>
            <Button type="primary" danger onClick={() => setRedirectToDashboard(true)}>Cancelar</Button>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default NewSale;
