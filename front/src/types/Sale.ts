import ItemSale from './ItemSale';
import PaymentMethod from './enums/PaymentMethod';

interface Sale {
  id?: number;
  items: ItemSale[];
  totalValue: number;
  paymentMethod: PaymentMethod;
  created?: Date | string;
}

export default Sale;
