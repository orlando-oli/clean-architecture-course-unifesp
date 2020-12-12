import { Email } from './email';

describe('Email validation', () => {
  test('should not accept null strings', () => {
    const email = null;

    expect(Email.validate(email)).toBeFalsy();
  });

  test('should not accept empty strings', () => {
    const email = '';

    expect(Email.validate(email)).toBeFalsy();
  });

  test('should not accept valid email', () => {
    const email = 'any@mail.com';

    expect(Email.validate(email)).toBeTruthy();
  });

  test('should not accept email larger than > 64', () => {
    const email = `${'l'.repeat(64)}@${'d'.repeat(128)}.${'d'.repeat(127)}`;

    expect(Email.validate(email)).toBeFalsy();
  });

  test('should not accept domain larger than > 255', () => {
    const email = `local@${'d'.repeat(128)}.${'d'.repeat(127)}`;

    expect(Email.validate(email)).toBeFalsy();
  });

  test('should not accept email-local larger than > 64', () => {
    const email = `${'l'.repeat(65)}@mail.com`;

    expect(Email.validate(email)).toBeFalsy();
  });
});
