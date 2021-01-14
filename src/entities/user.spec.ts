import { left } from '../shared/either';
import { InvalidEmailError } from './errors/invalid-email-error';
import { InvalidNameError } from './errors/invalid-name-error';
import { User } from './user';

describe('User domain class', () => {
  test('should not create user with invalid e-mail address', () => {
    const invalidEmail = 'invalid_email';
    const error = User.create({ name: 'any_name', email: invalidEmail });

    expect(error).toEqual(left(new InvalidEmailError()));
  });

  test('should not create user with invalid name (too short)', () => {
    const invalidName = '0           ';
    const error = User.create({ name: invalidName, email: 'any@mail.com' });

    expect(error).toEqual(left(new InvalidNameError()));
  });
  test('should not create user with invalid name (too long)', () => {
    const invalidName = '0'.repeat(257);
    const error = User.create({ name: invalidName, email: 'any@mail.com' });

    expect(error).toEqual(left(new InvalidNameError()));
  });
});
