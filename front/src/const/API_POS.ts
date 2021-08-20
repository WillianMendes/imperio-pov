export const API_URL_BASE = 'http://localhost:8080';

// ADMIN
export const API_URL_ADMIN_BASE = `${API_URL_BASE}/admin`;
export const API_URL_ADMIN_GET_BY_EMAIL = `${API_URL_ADMIN_BASE}`;
export const API_URL_ADMIN_SEND_MAIL_RECOVERY_PASSWORD = `${API_URL_ADMIN_BASE}/send-mail-recovery-password`; // + Email
export const API_URL_ADMIN_VERIFY_TOKEN_RECOVERY_PASSWORD = `${API_URL_ADMIN_BASE}/verify-token-recovery-password`; // + Token + Email
