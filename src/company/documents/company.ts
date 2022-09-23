import { Document, ObjectId } from 'mongoose';
import { CustomerDocument } from '../../documents/customer';
import { ProductDocument } from '../../documents/product';
import { SaleDocument } from '../../documents/sale';

export interface CompanyDocument extends Document {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  customers: CustomerDocument[];
  sales:  SaleDocument[];
  products: ProductDocument[];
}
