import * as EmailValidator from 'email-validator';
import { InvalidPayloadException } from '../../exceptions/invalid-payload-exception';
import { CompanyCredentialsDto } from '../dto/company-credentials-dto';

const REQUIRED_FIELDS = ['email', 'password'];

export const validateCompanyLoginPayload = (dto: CompanyCredentialsDto) => {
  for (let i = 0; i < REQUIRED_FIELDS.length; i++) {
    if (!dto[REQUIRED_FIELDS[i]]?.trim()) {
      throw new InvalidPayloadException(
        `Invalid payload: field ${REQUIRED_FIELDS[i]} should be informed!`
      );
    }
  }

  if (!EmailValidator.validate(dto.email)) {
    throw new InvalidPayloadException('Invalid payload: invalid e-mail!');
  }
};
