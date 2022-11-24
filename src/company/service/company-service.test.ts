import { CompanyDocument } from '../documents/company';
import { CompanyEmailAlreadyExistsException } from '../exceptions/company-email-already-exists-exception';
import { CompanyNotFoundException } from '../exceptions/company-not-found-exceptions';
import { CompanyService } from './company-service';
import {
  createCompanyMock,
  CARD_MONEY_MOCK,
  COMPANY_EMAIL_MOCK,
  COMPANY_MOCK,
  COMPANY_NAME_MOCK,
  COMPANY_PASSWORD_MOCK,
  CUSTOMERS_MOCK,
  CUSTOMER_MOCK,
  MONEY_MOCK,
  PRODUCT_MOCK,
  SALES_MOCK,
  SALE_MOCK
} from './company-service.mock';

jest.mock('../repository/company-repository', () => ({
  CompanyRepository: jest.fn().mockImplementation(() => ({
    findByEmail: (email: string) =>
      Promise.resolve(email === 'test@test.com' ? COMPANY_MOCK : undefined),
    findById: (id: string) =>
      Promise.resolve(id === '123' ? COMPANY_MOCK : undefined),
    create: createCompanyMock
  }))
}));

jest.mock('../../functions/encrypt', () => ({
  encryptStr: jest.fn(() => Promise.resolve(COMPANY_PASSWORD_MOCK))
}));

describe('Company service tests', () => {
  test('should throw CompanyEmailAlreadyExistsException when company e-mail already exists', async () => {
    // arrange
    const companyService = new CompanyService();

    try {
      // act
      await companyService.createCompany({
        ...COMPANY_MOCK,
        email: COMPANY_EMAIL_MOCK
      } as CompanyDocument);

      fail();
    } catch (error) {
      // assert
      expect(error).toBeInstanceOf(CompanyEmailAlreadyExistsException);
      expect(error.message).toBe('Invalid e-mail: already exists!');
    }
  });
});
