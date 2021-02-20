import { MongoHelper } from '@/external/repositories/mongodb/helper';
import { MongodbUserRepository } from '../../../../src/external/repositories/mongodb/mongodb-user-repository';

describe('Mongodb user repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    await MongoHelper.clearCollection('users');
  });

  test('verify if a given user has been successfully added to the db', async () => {
    const userRepository = new MongodbUserRepository();

    const user = {
      name: 'any_name',
      email: 'any@mail.com',
    };

    await userRepository.add(user);

    expect(await userRepository.exists(user)).toBeTruthy();
  });

  test('find all users should return every added user', async () => {
    const userRepository = new MongodbUserRepository();

    const user = {
      name: 'any_name1',
      email: 'any1@mail.com',
    };
    const user2 = {
      name: 'any_name2',
      email: 'any2@mail.com',
    };

    await userRepository.add(user);
    await userRepository.add(user2);

    const users = await userRepository.findAllUsers();

    expect(users[0]).toEqual(user);
    expect(users[1]).toEqual(user2);
  });
});
