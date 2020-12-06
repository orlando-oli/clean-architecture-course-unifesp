/* eslint-disable class-methods-use-this */
import { UserRepository } from '../ports/user-repository';
import { UserData } from '../user-data';

export class InMemoryUserRepository implements UserRepository {
  private repository: UserData[];

  constructor(repository: UserData[]) {
    this.repository = repository;
  }

  async add(user: UserData): Promise<void> {
    const exists = await this.exists(user);

    if (!exists) {
      this.repository.push(user);
    }
  }

  findUserByEmail(email: string): Promise<UserData> {
    const user = this.repository.find((currentUser) => currentUser.email === email);

    if (user) {
      return new Promise((resolve) => {
        resolve(user);
      });
    }

    return null;
  }

  findAllUsers(): Promise<UserData[]> {
    return new Promise((resolve) => {
      resolve(this.repository);
    });
  }

  async exists(user: UserData): Promise<boolean> {
    if ((await this.findUserByEmail(user.email)) === null) {
      return false;
    }

    return true;
  }
}
