import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { ADMIN_URL_LOGIN } from '../const/ROUTES_ADMIN';

import UserSessionStorage from '../utils/UserSessionStorage';

interface Props {
  path:string;
  children?:any;
  exact?: boolean;
  render?: any;
}

function ProtectedRoute({
  path, children, exact = false, render,
}: Props) {
  if (render) {
    return UserSessionStorage.getUserLogged()
      ? (<Route path={path} exact={exact} render={render} />)
      : (<Redirect to={ADMIN_URL_LOGIN} />);
  }
  return UserSessionStorage.getUserLogged()
    ? (<Route path={path} exact={exact}>{ children }</Route>)
    : (<Redirect to={ADMIN_URL_LOGIN} />);
}

export default ProtectedRoute;
