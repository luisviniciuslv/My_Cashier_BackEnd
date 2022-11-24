import mongoose, { Document } from 'mongoose';
import { CustomerDocument } from '../../documents/customer';
import { ProductDocument } from '../../documents/product';
import { SaleDocument } from '../../documents/sale';

export interface CompanyDocument extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  customers: CustomerDocument[];
  sales: SaleDocument[];
  products: ProductDocument[];
  money_in_note: number;
  card_money: number;
}
