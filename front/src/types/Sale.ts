import ItemSale from './ItemSale';
import PaymentMethod from './enums/PaymentMethod';

interface Sale {
  items: ItemSale[];
  totalValue: number;
  paymentMethod: PaymentMethod;
}

export default Sale;
