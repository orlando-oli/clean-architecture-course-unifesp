import { InMemoryUserRepository } from '../../../../test/usecases/add-user-mailing-list/repository/in-memory-user-repository';
import { AddUserToMailingList } from '../../../usecases/add-user-mailing-list/add-user-mailing-list';
import { AddUserController } from '../../../web-controllers/add-user-controller';

export const makeAddUserController = (): AddUserController => {
  const inMemoryUserRepository = new InMemoryUserRepository([]);

  const AddUserToMailingListUseCase = new AddUserToMailingList(inMemoryUserRepository);

  return new AddUserController(AddUserToMailingListUseCase);
};
