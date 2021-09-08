import Admin from './Admin';
import Sale from './Sale';
import CashOperation from './CashOperation';

interface CashDesk {
  id: number;
  operator: Admin;
  operations?: CashOperation[];
  open?: Date;
  closed?: Date | undefined;
  sales?: Sale[];
}

export default CashDesk;
