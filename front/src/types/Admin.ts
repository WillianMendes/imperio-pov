import AdminLevel from './AdminLevel';

interface Admin {
  id: Number;
  fullName: string;
  email: string;
  password: string;
  role: AdminLevel;
}

export default Admin;
