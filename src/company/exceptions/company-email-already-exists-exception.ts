export class CompanyEmailAlreadyExistsException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidCompanyEmailException';
  }
}
