import Admin from '../types/Admin';

class UserSessionStorage {
  static getUserLogged(): Admin | null {
    return JSON.parse(<string>sessionStorage.getItem('login'));
  }
}

export default UserSessionStorage;
