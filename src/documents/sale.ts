import mongoose, { Document } from 'mongoose';
import { ProductDocument } from './product';
export interface SaleDocument extends Document {
  _id: mongoose.Types.ObjectId;
  items: ProductDocument[];
  customer: mongoose.Types.ObjectId;
  date: Date;
  cash_payment: boolean;
  total: number;
}
