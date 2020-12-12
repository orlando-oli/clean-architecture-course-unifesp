export class Email {
  static validate(email: string): boolean {
    return Boolean(email);
  }
}
