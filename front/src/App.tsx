import React from 'react';
import {
  BrowserRouter, Route, Switch,
} from 'react-router-dom';

import 'antd/dist/antd.css';
import './styles/global.css';

import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import RecoveryPassword from './pages/RecoveryPassword';
import Products from './pages/Products';
import ProductRegister from './pages/ProductRegister';
import NotFound from './pages/NotFound';
import LayoutPanel from './components/LayoutPanel';

function App() {
  return (
    <BrowserRouter>
      <LayoutPanel>
        <Switch>
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
          <ProtectedRoute path="*">
            <Route component={NotFound} />
          </ProtectedRoute>
        </Switch>
      </LayoutPanel>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/recovery" component={RecoveryPassword} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
