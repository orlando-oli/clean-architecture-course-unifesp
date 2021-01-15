import { left } from '../../shared/either';
import { InvalidEmailError } from '../../entities/errors/invalid-email-error';
import { UserData } from '../../entities/user-data';
import { AddUserToMailingList } from './add-user-mailing-list';
import { UserRepository } from './ports/user-repository';
import { InMemoryUserRepository } from './repository/in-memory-user-repository';

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

    const response = await usecase.addUserToMailingList({ name, email: invalidEmail });
    const user = await repo.findUserByEmail('any@email.com');
    expect(user).toBeNull();
    expect(response).toEqual(left(new InvalidEmailError()));
  });
});
