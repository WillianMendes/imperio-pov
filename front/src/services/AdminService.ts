import ErrorApi from '../types/ErrorApi';

import {
  API_URL_ADMIN_SEND_MAIL_RECOVERY_PASSWORD as ADMIN_SEND_MAIL,
  API_URL_ADMIN_VERIFY_TOKEN_RECOVERY_PASSWORD as ADMIN_VERIFY_TOKEN,
  API_URL_ADMIN_CHANGE_PASSWORD_RECOVERY_PASSWORD as ADMIN_CHANGE_PASSWORD,
} from '../const/API_POS';
import Token from '../types/Token';

class AdminService {
  private static errorApi: ErrorApi = {
    message: 'Falha ao tentar se conectar com o servidor, verifique sua conexão ou tente novamente mais tarde!',
  };

  static async sendMailRecoveryPassword(email: string): Promise<Boolean | ErrorApi> {
    try {
      const response = await fetch(`${ADMIN_SEND_MAIL}/${email}`);
      return response.json();
    } catch (error) {
      this.errorApi.error = error;
      return this.errorApi;
    }
  }

  static async verifyTokenRecoveryPassword(token: string,
    email: string): Promise<Boolean | ErrorApi> {
    try {
      const response = await fetch(`${ADMIN_VERIFY_TOKEN}/${token}/${email}`);
      return response.json();
    } catch (error) {
      this.errorApi.error = error;
      return this.errorApi;
    }
  }

  static async changePassword(code: string, email: string,
    password: string): Promise<Boolean | ErrorApi> {
    const token: Token = {
      token: code,
      email,
      password,
    };

    const header = new Headers();
    header.set('Content-Type', 'application/json');

    try {
      const response = await fetch(ADMIN_CHANGE_PASSWORD, { method: 'PUT', body: JSON.stringify(token), headers: header });
      return response.json();
    } catch (error) {
      this.errorApi.error = error;
      return this.errorApi;
    }
  }
}

export default AdminService;
