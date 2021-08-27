interface Admin {
  id: Number;
  fullName: string;
  email: string;
  password: string;
  level: AdminLevel;
}

enum AdminLevel {
  Operador = 'Operador',
  Admin = 'Admin'
}

export default Admin;
