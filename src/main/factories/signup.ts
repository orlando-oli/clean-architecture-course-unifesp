import { MongodbUserRepository } from '@/external/repositories/mongodb/mongodb-user-repository';
import { AddUserToMailingList } from '@/usecases/add-user-mailing-list/add-user-mailing-list';
import { AddUserController } from '@/web-controllers/add-user-controller';

export const makeAddUserController = (): AddUserController => {
  const repo = new MongodbUserRepository();

  const AddUserToMailingListUseCase = new AddUserToMailingList(repo);

  return new AddUserController(AddUserToMailingListUseCase);
};
