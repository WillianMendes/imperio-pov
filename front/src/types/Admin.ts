interface Admin {
  id: Number;
  fullName: string;
  email: string;
  passwordEncoded: string;
  level: AdminLevel;
}

// eslint-disable-next-line no-shadow,no-unused-vars
enum AdminLevel {
  // eslint-disable-next-line no-unused-vars
  Operador = 'Operador',
  // eslint-disable-next-line no-shadow,no-unused-vars
  Admin = 'Admin'
}

export default Admin;
