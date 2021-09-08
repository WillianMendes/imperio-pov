import React, { FC } from 'react';
import CashDeskContextProvider from './CashDesk/CashDeskContextProvider';

const GlobalContext: FC = ({ children }) => (
  <CashDeskContextProvider>{children}</CashDeskContextProvider>
);

export default GlobalContext;
