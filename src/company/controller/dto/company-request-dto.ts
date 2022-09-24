import { CompanyDocument } from '../../documents/company';

export interface CompanyRequestDto {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export const toDocument = (dto: CompanyRequestDto): CompanyDocument => {
  const company = {
    name: dto.name,
    email: dto.email,
    password: dto.password
  } as CompanyDocument;

  return company;
};
