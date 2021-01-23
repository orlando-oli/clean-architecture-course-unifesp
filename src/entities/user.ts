import { Either, left, right } from '../shared';
import { Email } from './email';
import { InvalidEmailError, InvalidNameError } from './errors';
import { Name } from './name';
import { UserData } from './user-data';

export class User {
  public readonly name: Name;

  public readonly email: Email;

  private constructor(name: Name, email: Email) {
    this.name = name;
    this.email = email;
  }

  static create(userData: UserData): Either<InvalidNameError | InvalidEmailError, User> {
    const emailOrError = Email.create(userData.email);
    const nameOrError = Name.create(userData.name);

    if (nameOrError.isLeft()) {
      return left(nameOrError.value);
    }

    if (emailOrError.isLeft()) {
      return left(emailOrError.value);
    }
    const name: Name = nameOrError.value as Name;
    const email: Email = emailOrError.value as Email;

    return right(new User(name, email));
  }
}
