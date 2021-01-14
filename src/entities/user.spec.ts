import { left } from '../shared/either';
import { InvalidEmailError } from './errors/invalid-email-error';
import { User } from './user';

describe('User domain class', () => {
  test('should not create user with invalid e-mail address', () => {
    const invalidEmail = 'invalid_email';
    const error = User.create({ name: 'any_name', email: invalidEmail });
    expect(error).toEqual(left(new InvalidEmailError()));
  });
});
