/* eslint-disable consistent-return */
import { UserData } from '@/entities';
import { HttpRequest } from '@/web-controllers/ports/http-request';
import { UseCase } from '../usecases/ports/use-cases';
import { MissingParamError } from './errors/missing-param-error';
import { HttpResponse } from './ports';
import { badRequest, created, serverError } from './util/http-helper';

export class AddUserController {
  private readonly usecase: UseCase;

  constructor(usecase: UseCase) {
    this.usecase = usecase;
  }

  public async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      if (!request.body.name || !request.body.email) {
        let params = '';
        if (request.body.name) {
          params = 'email';
        } else if (request.body.email) {
          params = 'name';
        } else {
          params = 'name email';
        }

        return badRequest(new MissingParamError(params));
      }

      const userData: UserData = request.body;
      const response = await this.usecase.perform(userData);

      if (response.isRight()) {
        const { name, email } = response.value;

        return created({ name, email });
      }

      if (response.isLeft()) {
        return badRequest(response.value);
      }
    } catch (error) {
      return serverError(error);
    }
  }
}
