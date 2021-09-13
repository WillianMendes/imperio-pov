import Admin from '../types/Admin';

class UserSessionStorage {
  static getUserLogged(): Admin {
    return JSON.parse(<string>sessionStorage.getItem('login'));
  }

  static deleteUserLogged() {
    sessionStorage.clear();
  }
}

export default UserSessionStorage;
