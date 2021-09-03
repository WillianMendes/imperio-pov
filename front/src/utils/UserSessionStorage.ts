import Admin from '../types/Admin';

class UserSessionStorage {
  static getUserLogged(): Admin {
    return JSON.parse(<string>sessionStorage.getItem('login'));
  }
}

export default UserSessionStorage;
