import Admin from './Admin';
import Sale from './Sale';

interface CashDesk {
  id: number;
  operator: Admin;
  operations: number;
  open: Date;
  closed: Date | undefined;
  sales: Sale[];
}

export default CashDesk;
