import * as _ from 'lodash';
import { UserModel } from './user-model';

const users: UserModel[] = [
  {
    id: 1,
    username: 'admin',
    password: 'thisIsNotSecure',
  },
];

export class UserService {
  getByUsername(username: string): UserModel {
    const userIndex = _.findIndex(users, u => u.username === username);
    if (userIndex === -1) {
      return null;
    }

    return users[userIndex];
  }

  getById(id: number): UserModel {
    const userIndex = _.findIndex(users, u => u.id === id);
    if (userIndex === -1) {
      return null;
    }

    return users[userIndex];
  }

  areCredentialsValid(username: string, password: string): boolean {
    const user = this.getByUsername(username);
    if (!user || user.password !== password) {
      return false;
    }

    return true;
  }
}

export default new UserService();
