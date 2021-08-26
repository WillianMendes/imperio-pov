import ErrorApi from '../types/ErrorApi';
import Product from '../types/Product';
import Pageable from '../types/Pageable';
import {
  API_URL_PRODUCT_DELETE, API_URL_PRODUCT_FIND_BY_NAME,
  API_URL_PRODUCT_GET_BY_CODE,
  API_URL_PRODUCT_REGISTER,
  API_URL_PRODUCT_UPDATE,
  API_URL_PRODUCTS_LIST,
} from '../const/API_POS';

class ProductService {
  private static errorApi: ErrorApi = {
    message: 'Falha ao tentar se conectar com o servidor, verifique sua conexão ou tente novamente mais tarde!',
  };

  static async listAll(page = 0, size = 10) : Promise<Pageable<Product> | ErrorApi> {
    try {
      const response = await fetch(`${API_URL_PRODUCTS_LIST}?page=${page}&size=${size}`);
      return response.json();
    } catch (error) {
      this.errorApi.error = error;
      return this.errorApi;
    }
  }

  static async listByName(
    name: string, page: number = 0, size: number = 10,
  ): Promise<Product | ErrorApi> {
    try {
      const response = await fetch(`${API_URL_PRODUCT_FIND_BY_NAME}?term=${name}&page=${page}&size=${size}`);
      return response.json();
    } catch (error) {
      this.errorApi.error = error;
      return this.errorApi;
    }
  }

  static async findByCode(code: number): Promise<Product | ErrorApi> {
    try {
      const response = await fetch(`${API_URL_PRODUCT_GET_BY_CODE}?code=${code}`);
      return response.json();
    } catch (error) {
      this.errorApi.error = error;
      return this.errorApi;
    }
  }

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

  static async update(product: Product, code: number): Promise<Product | ErrorApi> {
    const header = new Headers();
    header.set('Content-Type', 'application/json');

    try {
      const response = await fetch(`${API_URL_PRODUCT_UPDATE}?code=${code}`,
        { method: 'PUT', body: JSON.stringify(product), headers: header });
      return response.json();
    } catch (error) {
      this.errorApi.error = error;
      return this.errorApi;
    }
  }

  static async delete(code: number): Promise<ErrorApi | Response> {
    const header = new Headers();
    header.set('Content-Type', 'application/json');

    try {
      const response = await fetch(`${API_URL_PRODUCT_DELETE}?code=${code}`, { method: 'DELETE', headers: header });
      if (response.status === 204) return response;
      return response.json();
    } catch (error) {
      this.errorApi.error = error;
      return this.errorApi;
    }
  }
}

export default ProductService;
