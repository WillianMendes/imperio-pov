import { createContext, Dispatch, SetStateAction } from 'react';
import CashDesk from '../../types/CashDesk';
import Admin, { AdminLevel } from '../../types/Admin';

type PropCashDeskContext = {
  cashDesk: CashDesk,
  setCashDesk: Dispatch<SetStateAction<CashDesk>>
}

const DEFAULT_VALUE_USER: Admin = {
  id: 0,
  fullName: '',
  email: '',
  passwordEncoded: '',
  level: AdminLevel.Operador,
};

const DEFAULT_VALUE_CASH_DESK = {
  cashDesk: {
    id: 0,
    operator: DEFAULT_VALUE_USER,
  },
  setCashDesk: () => {},
};

const CashDeskContext = createContext<PropCashDeskContext>(DEFAULT_VALUE_CASH_DESK);

export default CashDeskContext;
export { DEFAULT_VALUE_CASH_DESK };
