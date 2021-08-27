import React, { FC } from 'react';

import { Layout } from 'antd';

import MainMenu from './MainMenu';

const LayoutPanel: FC = ({ children }) => {
  const { Content } = Layout;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <MainMenu />
      <Layout>
        <Content>
          { children }
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutPanel;
