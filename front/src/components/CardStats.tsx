import React from 'react';

import { Card } from 'antd';

interface CardProps {
  text: string;
  value: string;
}

function CardStats(props: CardProps) {
  const { text, value } = props;

  return (
    <Card.Grid className="card-button-base card-stats" hoverable={false}>
      <h3>{ value }</h3>
      <h1>{ text }</h1>
    </Card.Grid>
  );
}

export default CardStats;
