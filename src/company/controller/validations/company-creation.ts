import * as EmailValidator from 'email-validator';
import { CompanyRequestDto } from '../dto/company-request-dto';
import { InvalidPayloadException } from '../../exceptions/invalid-payload-exception';

const REQUIRED_FIELDS = [
  'name',
  'email',
  'password',
  'password_confirmation'
];

export const validateCompanyPayload = (company: CompanyRequestDto) => {
  for (let i = 0; i < REQUIRED_FIELDS.length; i++) {
    if (!company[REQUIRED_FIELDS[i]]?.trim()) {
      throw new InvalidPayloadException(
        `Invalid payload: field ${REQUIRED_FIELDS[i]} should be informed!`
      );
    }
  }

  if (!EmailValidator.validate(company.email)) {
    throw new InvalidPayloadException('Invalid payload: invalid e-mail!');
  }

  if (company.password !== company.password_confirmation) {
    throw new InvalidPayloadException(
      'Invalid payload: password and password_confirmation should be equals!'
    );
  }
};
