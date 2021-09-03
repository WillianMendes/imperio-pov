import CashTypeOperation from './enums/CashTypeOperation';

interface CashOperation {
  id?: number;
  description: string;
  value: string;
  operation: CashTypeOperation;
}

export default CashOperation;
