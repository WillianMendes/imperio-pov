import { Button, Result } from 'antd';
import React from 'react';

function NotFound() {
  return (
    <div style={{ padding: 32 }}>
      <Result
        status="404"
        title="404"
        subTitle="Desculpe, essa página não existe ou o servidor está fora do ar."
        extra={<Button type="primary">Back Home</Button>}
      />
    </div>
  );
}

export default NotFound;
