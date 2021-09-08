import { API_URL_CASH_DESK_CLOSE, API_URL_CASH_DESK_OPEN } from '../const/API_POS';

import CashDesk from '../types/CashDesk';
import CashOperation from '../types/CashOperation';
import Admin from '../types/Admin';
import ErrorApi from '../types/ErrorApi';

class CashDeskService {
  private static errorApi: ErrorApi = {
    message: 'Falha ao tentar se conectar com o servidor, verifique sua conexão ou tente novamente mais tarde!',
  };

  static async openCashDesk(
    operator: Admin,
    initialOperation: CashOperation,
  ): Promise<CashDesk | ErrorApi> {
    const dataRequest = { operator, initialOperation };

    const header = new Headers();
    header.set('Content-Type', 'application/json');
    const headers = {
      method: 'POST',
      body: JSON.stringify(dataRequest),
      headers: header,
    };

    try {
      const response = await fetch(API_URL_CASH_DESK_OPEN, headers);
      return await response.json();
    } catch (error) {
      this.errorApi.error = error;
      return this.errorApi;
    }
  }

  static async closeCashDesk(operator: Admin): Promise<CashDesk | ErrorApi> {
    const header = new Headers();
    header.set('Content-Type', 'application/json');
    const headers = {
      method: 'POST',
      body: JSON.stringify(operator),
      headers: header,
    };

    try {
      const response = await fetch(API_URL_CASH_DESK_CLOSE, headers);
      return await response.json();
    } catch (error) {
      this.errorApi.error = error;
      return this.errorApi;
    }
  }

  static async getCashDeskActive(operator: Admin): Promise<CashDesk | ErrorApi> {
    const header = new Headers();
    header.set('Content-Type', 'application/json');
    const headers = {
      method: 'POST',
      body: JSON.stringify(operator),
      headers: header,
    };

    try {
      const response = await fetch('http://localhost:8080/api/cash-desk/', headers);
      return await response.json();
    } catch (error) {
      this.errorApi.error = error;
      return this.errorApi;
    }
  }
}

export default CashDeskService;
