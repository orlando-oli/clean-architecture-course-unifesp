import { UserData } from '@/entities';
import { AddUserToMailingList } from '@/usecases';
import { UserRepository } from '@/usecases/add-user-mailing-list/ports';
import { AddUserController } from '@/web-controllers/';
import { HttpRequest, HttpResponse } from '@/web-controllers/ports/';
import { InMemoryUserRepository } from '@test/usecases/add-user-mailing-list/repository';
import { InvalidEmailError } from '../../src/entities/errors/invalid-email-error';
import { InvalidNameError } from '../../src/entities/errors/invalid-name-error';
import { MissingParamError } from '../../src/web-controllers/errors/missing-param-error';

describe('Add user web controller', () => {
  test('should return status code 201 if request is valid', async () => {
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
    const response: HttpResponse = await controller.handle(request);

    expect(response.statusCode).toEqual(201);
    expect(response.body).toEqual(request.body);
  });

  test('should return status code 400 if request has an invalid name', async () => {
    const request: HttpRequest = {
      body: {
        name: 'A',
        email: 'any@mail.com',
      },
    };
    const users: UserData[] = [];

    const repo: UserRepository = new InMemoryUserRepository(users);
    const usecase: AddUserToMailingList = new AddUserToMailingList(repo);
    const controller: AddUserController = new AddUserController(usecase);
    const response: HttpResponse = await controller.handle(request);

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(InvalidNameError);
  });

  test('should return status code 400 if request has an invalid email', async () => {
    const request: HttpRequest = {
      body: {
        name: 'Any name',
        email: 'invalid_mail.com',
      },
    };
    const users: UserData[] = [];

    const repo: UserRepository = new InMemoryUserRepository(users);
    const usecase: AddUserToMailingList = new AddUserToMailingList(repo);
    const controller: AddUserController = new AddUserController(usecase);
    const response: HttpResponse = await controller.handle(request);

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(InvalidEmailError);
  });

  test('should return status code 400 if request has no name', async () => {
    const request: HttpRequest = {
      body: {
        email: 'any@mail.com',
      },
    };
    const users: UserData[] = [];

    const repo: UserRepository = new InMemoryUserRepository(users);
    const usecase: AddUserToMailingList = new AddUserToMailingList(repo);
    const controller: AddUserController = new AddUserController(usecase);
    const response: HttpResponse = await controller.handle(request);

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(MissingParamError);
    expect((response.body as Error).message).toEqual('Missing parameter from request: name');
  });

  test('should return status code 400 if request has no email', async () => {
    const request: HttpRequest = {
      body: {
        name: 'Any name',
      },
    };
    const users: UserData[] = [];

    const repo: UserRepository = new InMemoryUserRepository(users);
    const usecase: AddUserToMailingList = new AddUserToMailingList(repo);
    const controller: AddUserController = new AddUserController(usecase);
    const response: HttpResponse = await controller.handle(request);

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(MissingParamError);
    expect((response.body as Error).message).toEqual('Missing parameter from request: email');
  });

  test('should return status code 400 if request hasn no parameters', async () => {
    const request: HttpRequest = {
      body: {},
    };
    const users: UserData[] = [];

    const repo: UserRepository = new InMemoryUserRepository(users);
    const usecase: AddUserToMailingList = new AddUserToMailingList(repo);
    const controller: AddUserController = new AddUserController(usecase);
    const response: HttpResponse = await controller.handle(request);

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(MissingParamError);
    expect((response.body as Error).message).toEqual('Missing parameter from request: name email');
  });
});
