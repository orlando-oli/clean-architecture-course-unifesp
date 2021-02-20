import { MongodbUserRepository } from '@/external/repositories/mongodb/mongodb-user-repository';
import { AddUserToMailingList } from '@/usecases/add-user-mailing-list/add-user-mailing-list';
import { InMemoryUserRepository } from '@/usecases/add-user-mailing-list/repository/in-memory-user-repository';
import { AddUserController } from '@/web-controllers/add-user-controller';

export const makeAddUserController = (): AddUserController => {
  let repo;
  if (process.env.NODE_ENV === 'test') repo = new InMemoryUserRepository([]);
  else repo = new MongodbUserRepository();

  const AddUserToMailingListUseCase = new AddUserToMailingList(repo);

  return new AddUserController(AddUserToMailingListUseCase);
};
