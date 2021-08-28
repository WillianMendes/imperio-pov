import React from 'react';
import { Link } from 'react-router-dom';

import { Button, Result } from 'antd';

import { ADMIN_URL_APP_DASHBOARD } from '../const/ROUTES_ADMIN';

function NotFound() {
  function renderButtonBackHome() {
    return (
      <Link to={ADMIN_URL_APP_DASHBOARD}>
        <Button type="primary">Back Home</Button>
      </Link>
    );
  }
  return (
    <div style={{ padding: 32 }}>
      <Result
        status="404"
        title="404"
        subTitle="Desculpe, essa página não existe ou o servidor está fora do ar."
        extra={renderButtonBackHome()}
      />
    </div>
  );
}

export default NotFound;
