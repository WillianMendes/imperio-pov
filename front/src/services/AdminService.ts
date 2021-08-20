import ErrorApi from '../types/ErrorApi';

import {
  API_URL_ADMIN_SEND_MAIL_RECOVERY_PASSWORD as ADMIN_SEND_MAIL,
} from '../const/API_POS';

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
}

export default AdminService;
