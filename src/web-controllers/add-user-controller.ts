/* eslint-disable consistent-return */
import { UserData } from '@/entities';
import { HttpRequest } from '@/web-controllers/ports/http-request';
import { created } from './util/http-helper';
import { AddUserToMailingList } from '../usecases';
import { HttpResponse } from './ports';

export class AddUserController {
  private readonly usecase: AddUserToMailingList;

  constructor(usecase: AddUserToMailingList) {
    this.usecase = usecase;
  }

  public async handle(request: HttpRequest): Promise<HttpResponse> {
    const userData: UserData = request.body;
    const response = await this.usecase.addUserToMailingList(userData);

    if (response.isRight()) {
      return created(response.value);
    }
  }
}
