import { UserData } from '../user-data';
import { InMemoryUserRepository } from './in-memory-user-repository';

describe('In memory User repository', () => {
  test('should return null if the user was not found', async () => {
    const users: UserData[] = [];
    const userRepo = new InMemoryUserRepository(users);

    const user = await userRepo.findUserByEmail('any@mail.com');

    expect(user).toBeNull();
  });

  test('should return the user if it was found', async () => {
    const users: UserData[] = [];
    const name = 'any_name';
    const email = 'any@mail.com';

    const userRepo = new InMemoryUserRepository(users);
    await userRepo.add({ name, email });

    const user = await userRepo.findUserByEmail('any@mail.com');

    expect(user.name).toBe(name);
  });
});
