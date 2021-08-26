interface Product {
  code?: number;
  name: string;
  priceCost: number;
  priceSell: number;
  quantity: number;
  measurement: Measurement;
  isOnDemand: boolean;
}

enum Measurement {
  M2 = 'Metros Quadrados',
  M3 = 'Metros Cubicos',
  M = 'Metros',
  KG = 'Quilos',
  UN = 'Unidades',
}

export default Product;
