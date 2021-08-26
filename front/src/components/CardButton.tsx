import React from 'react';
import { Link } from 'react-router-dom';

import { Card } from 'antd';

interface CardProps {
  text: string;
  icon: any;
  path: string;
}

function CardButton(props: CardProps) {
  const { text, icon, path } = props;
  const Icon = icon;

  return (
    <Link to={path}>
      <Card.Grid className="card-button-base card-button" hoverable>
        { Icon }
        <h1>{ text }</h1>
      </Card.Grid>
    </Link>

  );
}

export default CardButton;
