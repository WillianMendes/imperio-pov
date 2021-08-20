import React, { FC } from 'react';
import {
  BrowserRouter, Switch, Route,
} from 'react-router-dom';

import Login from './pages/Login';
import RecoveryPassword from './pages/RecoveryPassword';

import 'antd/dist/antd.css';
import './styles/global.css';

const App: FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/recovery" component={RecoveryPassword} />
    </Switch>
  </BrowserRouter>
);

export default App;
