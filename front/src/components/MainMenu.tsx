import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Menu, Layout } from 'antd';

import {
  DollarOutlined, LogoutOutlined, SettingOutlined, ShoppingOutlined, UserOutlined,
} from '@ant-design/icons';

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
          <Link to="/dashboard">
            Caixa
          </Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<ShoppingOutlined />}>
          <Link to="/product">
            Produtos
          </Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<UserOutlined />}>
          <Link to="/customer">
            Clientes
          </Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<SettingOutlined />}>
          <Link to="/setting">
            Configurações
          </Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<LogoutOutlined />}>
          <Link to="/logout">
            Sair
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default MainMenu;
