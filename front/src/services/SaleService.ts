import ErrorApi from '../types/ErrorApi';
import Sale from '../types/Sale';

import { API_URL_SALE_NEW } from '../const/API_POS';

class SaleService {
  private static errorApi: ErrorApi = {
    message: 'Falha ao tentar se conectar com o servidor, verifique sua conexão ou tente novamente mais tarde!',
  };

  static async save(sale: Sale, cashDeskId: number): Promise<Sale | ErrorApi> {
    const header = new Headers();
    header.set('Content-Type', 'application/json');
    const headers = {
      method: 'POST',
      body: JSON.stringify(sale),
      headers: header,
    };

    try {
      const response = await fetch(`${API_URL_SALE_NEW}?cashDeskId=${cashDeskId}`, headers);
      return await response.json();
    } catch (error) {
      this.errorApi.error = error;
      return this.errorApi;
    }
  }
}

export default SaleService;
