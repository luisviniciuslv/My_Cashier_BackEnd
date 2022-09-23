import { Document, ObjectId } from 'mongoose';
import { ProductDocument } from './product';
export interface SaleDocument extends Document {
  _id: ObjectId;
  customer: ObjectId;
  date: Date;
  total: number;
  items: ProductDocument[];
}
