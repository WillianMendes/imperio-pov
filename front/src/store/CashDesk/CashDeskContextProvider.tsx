import React, { FC, useState } from 'react';
import CashDeskContext, { DEFAULT_VALUE_CASH_DESK } from './CashDeskContext';

const CashDeskContextProvider: FC = ({ children }) => {
  const [cashDesk, setCashDesk] = useState(DEFAULT_VALUE_CASH_DESK.cashDesk);
  return (
    <CashDeskContext.Provider value={{ cashDesk, setCashDesk }}>
      {children}
    </CashDeskContext.Provider>
  );
};

export default CashDeskContextProvider;
