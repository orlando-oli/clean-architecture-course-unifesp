import { Either, left, right } from '../shared/either';
import { InvalidEmailError } from './errors/invalid-email-error';

export class Email {
  public readonly value: string;

  private constructor(email: string) {
    this.value = email;
  }

  static create(email: string): Either<InvalidEmailError, Email> {
    if (Email.validate(email)) {
      return right(new Email(email));
    }

    return left(new InvalidEmailError(email));
  }

  static validate(email: string): boolean {
    if (!email) {
      return false;
    }

    if (email.length > 320) {
      return false;
    }

    const emailRegex = /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0+9])+$/;
    if (!emailRegex.test(email)) {
      return false;
    }

    const [local, domain] = email.split('@');
    if (!local || !domain) {
      return false;
    }

    if (local.length > 64) {
      return false;
    }

    if (domain.length > 255) {
      return false;
    }

    const splitDomain = domain.split('.');
    if (splitDomain.some((part) => part.length > 63)) {
      return false;
    }

    return true;
  }
}
