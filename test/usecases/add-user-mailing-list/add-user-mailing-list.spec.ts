import { UserData } from '../../../src/entities';
import { AddUserToMailingList } from '../../../src/usecases';
import { UserRepository } from '../../../src/usecases/add-user-mailing-list/ports';
import { InMemoryUserRepository } from './repository';

describe('Add user to the mailing list use case', () => {
  test('should add user with complete data to the mailing list', async () => {
    const users: UserData[] = [];

    const repo: UserRepository = new InMemoryUserRepository(users);
    const usecase: AddUserToMailingList = new AddUserToMailingList(repo);

    const name = 'any_name';
    const email = 'any@email.com';
    const response = await usecase.addUserToMailingList({ name, email });
    const user = repo.findUserByEmail('any@email.com');
    expect((await user).name).toBe('any_name');
    expect(response.value.name).toBe('any_name');
  });

  test('should not add user with invalid email to the mailing list', async () => {
    const users: UserData[] = [];

    const repo: UserRepository = new InMemoryUserRepository(users);
    const usecase: AddUserToMailingList = new AddUserToMailingList(repo);

    const name = 'any_name';
    const invalidEmail = 'invalid_email';

    const response = (await usecase.addUserToMailingList({ name, email: invalidEmail }))
      .value as Error;
    const user = await repo.findUserByEmail('any@email.com');
    expect(user).toBeNull();
    expect(response.name).toEqual('InvalidEmailError');
  });

  test('should not add user with invalid name to the mailing list', async () => {
    const users: UserData[] = [];

    const repo: UserRepository = new InMemoryUserRepository(users);
    const usecase: AddUserToMailingList = new AddUserToMailingList(repo);

    const invalidName = '';
    const email = 'any@mail.com';

    const response = (await usecase.addUserToMailingList({ name: invalidName, email }))
      .value as Error;
    const user = await repo.findUserByEmail(email);
    expect(user).toBeNull();
    expect(response.name).toEqual('InvalidNameError');
  });
});
