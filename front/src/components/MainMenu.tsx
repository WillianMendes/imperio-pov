import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Menu, Layout } from 'antd';

import {
  DollarOutlined, LogoutOutlined, SettingOutlined, ShoppingOutlined, UserOutlined,
} from '@ant-design/icons';

import {
  ADMIN_URL_APP_CUSTOMER_BASE,
  ADMIN_URL_APP_DASHBOARD, ADMIN_URL_APP_LOGOUT_BASE,
  ADMIN_URL_APP_PRODUCT_BASE,
  ADMIN_URL_APP_SETTINGS_BASE,
} from '../const/ROUTES_ADMIN';

function MainMenu() {
  const { Sider } = Layout;

  const [collapsed, setCollapsed] = useState<boolean>(false);

  function onCollapse(isCollapsed: boolean) {
    setCollapsed(isCollapsed);
  }

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1" icon={<DollarOutlined />}>
          <Link to={ADMIN_URL_APP_DASHBOARD}>
            Caixa
          </Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<ShoppingOutlined />}>
          <Link to={ADMIN_URL_APP_PRODUCT_BASE}>
            Produtos
          </Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<UserOutlined />}>
          <Link to={ADMIN_URL_APP_CUSTOMER_BASE}>
            Clientes
          </Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<SettingOutlined />}>
          <Link to={ADMIN_URL_APP_SETTINGS_BASE}>
            Configurações
          </Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<LogoutOutlined />}>
          <Link to={ADMIN_URL_APP_LOGOUT_BASE}>
            Sair
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default MainMenu;
