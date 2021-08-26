import React from 'react';
import { Route, Redirect } from 'react-router-dom';

interface Props {
  path:string;
  // eslint-disable-next-line react/require-default-props
  children?:any;
  exact?: boolean;
}

function ProtectedRoute({ path, children, exact = false }: Props) {
  function getUserLogged(): string | null {
    return sessionStorage.getItem('login');
  }

  return getUserLogged() ? (<Route path={path} exact={exact}>{ children }</Route>) : (<Redirect to="/login" />);
}

export default ProtectedRoute;
