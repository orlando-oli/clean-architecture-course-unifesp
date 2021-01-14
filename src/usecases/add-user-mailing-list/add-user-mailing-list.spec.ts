import { UserData } from '../../entities/user-data';

describe('Add user to the mailing list use case', () => {
  test('should add user with complete data to the mailing list', async () => {
    const users: UserData[] = [];
    console.log(users);
    // const repo: UserRepo = new InMemoryUserRepository(users);
    // const usecase: AddUserToMailingList = new AddUserToMailingList(repo);
    // const name = 'any_name';
    // const email = 'any@email.com';
    // const response = await usecase.AddUserToMailingList({ name, email });
    // const user = repo.findUserByEmail('any@email.com');
    // expect((await user).name).toBe('any_name');
  });
});
