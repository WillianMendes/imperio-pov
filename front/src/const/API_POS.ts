export const API_URL_BASE_PROD = 'http://willian1120.integrator.host:9257';
export const API_URL_BASE_DEV = 'http://localhost:8080';

// ADMIN
export const API_URL_ADMIN_BASE = `${API_URL_BASE_DEV}/admin`;
export const API_URL_ADMIN_GET_BY_EMAIL = `${API_URL_ADMIN_BASE}`;
export const API_URL_ADMIN_SEND_MAIL_RECOVERY_PASSWORD = `${API_URL_ADMIN_BASE}/send-mail-recovery-password`; // + Email
export const API_URL_ADMIN_VERIFY_TOKEN_RECOVERY_PASSWORD = `${API_URL_ADMIN_BASE}/verify-token-recovery-password`; // + Token + Email
export const API_URL_ADMIN_CHANGE_PASSWORD_RECOVERY_PASSWORD = `${API_URL_ADMIN_BASE}/change-password`; // + Token + Email + password
export const API_URL_ADMIN_LOGIN = `${API_URL_ADMIN_BASE}/authentication`; // email + password

// PRODUCT
export const API_URL_PRODUCT_BASE = `${API_URL_BASE_DEV}/product`;
export const API_URL_PRODUCTS_LIST = `${API_URL_PRODUCT_BASE}`; // page + size
export const API_URL_PRODUCT_GET_BY_CODE = `${API_URL_PRODUCT_BASE}/search`; // code
export const API_URL_PRODUCT_FIND_BY_NAME = `${API_URL_PRODUCT_BASE}/search`; // term
export const API_URL_PRODUCT_REGISTER = `${API_URL_PRODUCT_BASE}/save`; // METHOD POST
export const API_URL_PRODUCT_UPDATE = `${API_URL_PRODUCT_BASE}/update`; // METHOD PUT
