import { UserData } from '@/entities';
import { AddUserToMailingList } from '@/usecases';
import { UserRepository } from '@/usecases/add-user-mailing-list/ports';
import { AddUserController } from '@/web-controllers/';
import { HttpRequest, HttpResponse } from '@/web-controllers/ports/';
import { InMemoryUserRepository } from '@test/usecases/add-user-mailing-list/repository';

describe('Add user web controller', () => {
  test('shuold return status code 201 if request is valid', async () => {
    const request: HttpRequest = {
      body: {
        name: 'Any name',
        email: 'any@mail.com',
      },
    };
    const users: UserData[] = [];

    const repo: UserRepository = new InMemoryUserRepository(users);
    const usecase: AddUserToMailingList = new AddUserToMailingList(repo);
    const controller: AddUserController = new AddUserController(usecase);
    const responde: HttpResponse = await controller.handle(request);

    expect(responde.statusCode).toEqual(201);
    expect(responde.body).toEqual(request.body);
  });

  test("shuold return status code 400 if request isn't valid", async () => {
    const request: HttpRequest = {
      body: {
        name: 'Any name',
        email: 'any@mail.com',
      },
    };
    const users: UserData[] = [];

    const repo: UserRepository = new InMemoryUserRepository(users);
    const usecase: AddUserToMailingList = new AddUserToMailingList(repo);
    const controller: AddUserController = new AddUserController(usecase);
    const responde: HttpResponse = await controller.handle(request);

    expect(responde.statusCode).toEqual(201);
    expect(responde.body).toEqual(request.body);
  });
});
