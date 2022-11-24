import { CompanyDocument } from '../documents/company';
import { CustomerDocument } from '../../documents/customer';
import mongoose from 'mongoose';
import { SaleDocument } from '../../documents/sale';
import { ProductDocument } from '../../documents/product';

const ID_MOCK: mongoose.Types.ObjectId = new mongoose.Types.ObjectId();

export const PRODUCT_MOCK = {
  name: 'creme',
  price: 100
} as ProductDocument;

export const SALE_MOCK = {
  items: [PRODUCT_MOCK],
  customer: ID_MOCK,
  date: new Date(),
  cash_payment: true,
  total: 100
} as SaleDocument;

export const CUSTOMER_MOCK = {
  name: 'rodrigo',
  phone: '11912345678',
  email: 'rodrigo@test.com',
  purchases: [ID_MOCK]
} as CustomerDocument;

export const COMPANY_NAME_MOCK = 'test123';
export const COMPANY_EMAIL_MOCK = 'test@test.com';
export const COMPANY_PASSWORD_MOCK = 'SD_d4FE-Safb';
export const CUSTOMERS_MOCK = [CUSTOMER_MOCK];
export const SALES_MOCK = [SALE_MOCK];
export const MONEY_MOCK = 1000;
export const CARD_MONEY_MOCK = 3000;

export const COMPANY_MOCK = {
  email: 'anything@test.com',
  name: 'test1',
  password: COMPANY_PASSWORD_MOCK,
  customers: CUSTOMERS_MOCK,
  sales: SALES_MOCK
} as CompanyDocument;

export const createCompanyMock = jest.fn(() => Promise.resolve(COMPANY_MOCK));
