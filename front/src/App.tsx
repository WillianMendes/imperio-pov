import React from 'react';
import {
  BrowserRouter, Route, Switch,
} from 'react-router-dom';

import { Layout } from 'antd';

import 'antd/dist/antd.css';
import './styles/global.css';

import ProtectedRoute from './components/ProtectedRoute';
import MainMenu from './components/MainMenu';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import RecoveryPassword from './pages/RecoveryPassword';
import Products from './pages/Products';
import ProductRegister from './pages/ProductRegister';

function App() {
  const { Content } = Layout;
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/recovery" component={RecoveryPassword} />
        <Layout style={{ minHeight: '100vh' }}>
          <MainMenu />
          <Layout>
            <Content>
              <ProtectedRoute path="/dashboard">
                <Dashboard />
              </ProtectedRoute>
              <ProtectedRoute path="/product" exact>
                <Products />
              </ProtectedRoute>
              <ProtectedRoute path="/product/update/:code">
                <ProductRegister />
              </ProtectedRoute>
              <ProtectedRoute path="/product/register">
                <ProductRegister />
              </ProtectedRoute>
            </Content>
          </Layout>
        </Layout>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
