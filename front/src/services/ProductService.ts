import ErrorApi from '../types/ErrorApi';
import Product from '../types/Product';
import { API_URL_PRODUCT_REGISTER } from '../const/API_POS';

class ProductService {
  private static errorApi: ErrorApi = {
    message: 'Falha ao tentar se conectar com o servidor, verifique sua conexão ou tente novamente mais tarde!',
  };

  static async save(product: Product): Promise<Product | ErrorApi> {
    const header = new Headers();
    header.set('Content-Type', 'application/json');

    try {
      const response = await fetch(API_URL_PRODUCT_REGISTER,
        { method: 'POST', body: JSON.stringify(product), headers: header });
      return response.json();
    } catch (error) {
      this.errorApi.error = error;
      return this.errorApi;
    }
  }
}

export default ProductService;
