import { Either, left, right } from '@/shared';
import { InvalidNameError } from '@/entities/errors';

export class Name {
  public readonly value: string;

  private constructor(name: string) {
    this.value = name;
  }

  public static create(name: string): Either<InvalidNameError, Name> {
    if (!Name.validate(name)) {
      return left(new InvalidNameError(name));
    }

    return right(new Name(name));
  }

  public static validate(name: string): boolean {
    if (!name) {
      return false;
    }

    const trimmedName = name.trim();

    if (trimmedName.length < 2 || trimmedName.length > 256) {
      return false;
    }

    return true;
  }
}
