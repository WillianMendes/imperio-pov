import CashTypeOperation from './enums/CashTypeOperation';
import CashDesk from './CashDesk';

interface CashOperation {
  id?: number;
  description: string;
  value: string;
  operation: CashTypeOperation;
  cashDesk?: CashDesk;
}

export default CashOperation;
