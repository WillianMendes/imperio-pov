// ROUTES PUBLICS
export const ADMIN_URL_LOGIN = '/login';
export const ADMIN_URL_RECOVERY_PASSWORD = '/recovery';

export const ADMIN_URL_APP_BASE = '/app';
export const ADMIN_URL_APP_DASHBOARD = `${ADMIN_URL_APP_BASE}/dashboard`;
export const ADMIN_URL_APP_NEW_SALE = `${ADMIN_URL_APP_BASE}/new-sale`;
export const ADMIN_URL_APP_CASH_DESK_CLOSE = `${ADMIN_URL_APP_BASE}/cash-desk-closed`;

export const ADMIN_URL_APP_PRODUCT_BASE = `${ADMIN_URL_APP_BASE}/product`;
export const ADMIN_URL_APP_PRODUCT_REGISTER = `${ADMIN_URL_APP_PRODUCT_BASE}/register`;
export const ADMIN_URL_APP_PRODUCT_UPDATE = `${ADMIN_URL_APP_PRODUCT_BASE}/update/:code`;

export const ADMIN_URL_APP_CUSTOMER_BASE = `${ADMIN_URL_APP_BASE}/customer`;

export const ADMIN_URL_APP_SETTINGS_BASE = `${ADMIN_URL_APP_BASE}/settings`;

export const ADMIN_URL_APP_LOGOUT_BASE = `${ADMIN_URL_APP_BASE}/logout`;
