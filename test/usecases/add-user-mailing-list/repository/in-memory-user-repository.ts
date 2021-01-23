import { UserData } from '../../../../src/entities';
import { UserRepository } from '../../../../src/usecases/add-user-mailing-list/ports';

/* eslint-disable class-methods-use-this */
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

  async findUserByEmail(email: string): Promise<UserData> {
    const user = this.repository.find((currentUser) => currentUser.email === email);

    return user || null;
  }

  async findAllUsers(): Promise<UserData[]> {
    return this.repository;
  }

  async exists(user: UserData): Promise<boolean> {
    if ((await this.findUserByEmail(user.email)) === null) {
      return false;
    }

    return true;
  }
}
