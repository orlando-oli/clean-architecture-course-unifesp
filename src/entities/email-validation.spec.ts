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

  test('should accept valid emails', () => {
    const email = 'any@mail.com';

    expect(Email.validate(email)).toBeTruthy();
  });

  test('should not accept an email larger than 64', () => {
    const email = `${'l'.repeat(64)}@${'d'.repeat(128)}.${'d'.repeat(127)}`;

    expect(Email.validate(email)).toBeFalsy();
  });

  test('should not accept a domain larger than 255', () => {
    const email = `local@${'d'.repeat(128)}.${'d'.repeat(127)}`;

    expect(Email.validate(email)).toBeFalsy();
  });

  test('should not accept a local larger than 64', () => {
    const email = `${'l'.repeat(65)}@mail.com`;

    expect(Email.validate(email)).toBeFalsy();
  });

  test('should not accept an empty local', () => {
    const email = `@mail.com`;

    expect(Email.validate(email)).toBeFalsy();
  });

  test('should not accept an empty domain', () => {
    const email = `any@`;

    expect(Email.validate(email)).toBeFalsy();
  });

  test('should not accept a domain with a part larger than 63', () => {
    const email = `any@${'d'.repeat(64)}.com`;

    expect(Email.validate(email)).toBeFalsy();
  });

  test('should not accept locals with invalid characters', () => {
    const email = `any @mail.com`;

    expect(Email.validate(email)).toBeFalsy();
  });

  test('should not accept locals with ..', () => {
    const email = `any..email@mail.com`;

    expect(Email.validate(email)).toBeFalsy();
  });

  test('should not accept locals with "." before "@"', () => {
    const email = `any.@mail.com`;

    expect(Email.validate(email)).toBeFalsy();
  });

  test('should not accept locals without "@"', () => {
    const email = `anymail.com`;

    expect(Email.validate(email)).toBeFalsy();
  });
});
