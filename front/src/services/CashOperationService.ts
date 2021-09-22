import { API_URL_CASH_DESK_OPERATION_SAVE } from '../const/API_POS';

import CashOperation from '../types/CashOperation';
import ErrorApi from '../types/ErrorApi';

class CashOperationService {
  private static errorApi: ErrorApi = {
    message: 'Falha ao tentar se conectar com o servidor, verifique sua conexão ou tente novamente mais tarde!',
  };

  static async save(cashOperation: CashOperation): Promise<any> {
    const header = new Headers();
    header.set('Content-Type', 'application/json');
    const headers = {
      method: 'POST',
      body: JSON.stringify(cashOperation),
      headers: header,
    };

    try {
      const response = await fetch(API_URL_CASH_DESK_OPERATION_SAVE, headers);
      return response;
    } catch (error) {
      this.errorApi.error = error;
      return this.errorApi;
    }
  }
}

export default CashOperationService;
