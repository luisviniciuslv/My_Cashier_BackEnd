import { model, Schema } from 'mongoose';
import { CompanyDocument } from '../documents/company';

export const CompanySchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  customers: [{ type: Array, required: true }],
  sales: [{ type: Array, required: true }],
  products: [{ type: Array, required: true }],
  money_in_note: { type: Number, required: true },
  card_money: { type: Number, required: true }
});

const Company = model<CompanyDocument>('Company', CompanySchema);

export default Company;
