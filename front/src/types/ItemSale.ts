import Product from './Product';

interface ItemSale {
  product: Product;
  quantity: number;
  unitaryValue: number;
  totalValue: number;
}

export default ItemSale;
