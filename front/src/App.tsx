import React from 'react';
import {
  BrowserRouter, Redirect, Route, Switch,
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
import NewSale from './pages/NewSale';

import {
  ADMIN_URL_APP_BASE,
  ADMIN_URL_APP_DASHBOARD,
  ADMIN_URL_APP_NEW_SALE,
  ADMIN_URL_APP_PRODUCT_BASE,
  ADMIN_URL_APP_PRODUCT_REGISTER,
  ADMIN_URL_APP_PRODUCT_UPDATE,
  ADMIN_URL_LOGIN,
  ADMIN_URL_RECOVERY_PASSWORD,
} from './const/ROUTES_ADMIN';

function App() {
  return (
    <BrowserRouter>
      <Redirect exact from="/" to={ADMIN_URL_APP_DASHBOARD} />

      <Route path={[ADMIN_URL_LOGIN, ADMIN_URL_RECOVERY_PASSWORD]}>
        <Switch>
          <Route path={ADMIN_URL_LOGIN} component={Login} />
          <Route path={ADMIN_URL_RECOVERY_PASSWORD} component={RecoveryPassword} />
        </Switch>
      </Route>

      <Route path={ADMIN_URL_APP_BASE}>
        <LayoutPanel>
          <Switch>
            <ProtectedRoute path={ADMIN_URL_APP_DASHBOARD} exact>
              <Dashboard />
            </ProtectedRoute>
            <ProtectedRoute path={ADMIN_URL_APP_NEW_SALE} exact>
              <NewSale />
            </ProtectedRoute>
            <ProtectedRoute path={ADMIN_URL_APP_PRODUCT_BASE} exact>
              <Products />
            </ProtectedRoute>
            <ProtectedRoute path={ADMIN_URL_APP_PRODUCT_UPDATE}>
              <ProductRegister />
            </ProtectedRoute>
            <ProtectedRoute path={ADMIN_URL_APP_PRODUCT_REGISTER} exact>
              <ProductRegister />
            </ProtectedRoute>
            <ProtectedRoute path={`${ADMIN_URL_APP_BASE}*`}>
              <NotFound />
            </ProtectedRoute>
          </Switch>
        </LayoutPanel>
      </Route>
    </BrowserRouter>
  );
}

export default App;
