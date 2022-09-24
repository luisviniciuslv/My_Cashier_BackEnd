import { Document, ObjectId } from 'mongoose';
import { ProductDocument } from './product';
export interface SaleDocument extends Document {
  _id: ObjectId;
  items: ProductDocument[];
  customer: ObjectId;
  date: Date;
  cash_payment: boolean;
  total: number;
}
