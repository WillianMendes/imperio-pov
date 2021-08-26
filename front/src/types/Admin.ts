interface Admin {
  id: Number;
  fullName: string;
  email: string;
  password: string;
  role: AdminLevel;
}

enum AdminLevel {
  Operador = 'Operador',
  Admin = 'Admin'
}

export default Admin;
