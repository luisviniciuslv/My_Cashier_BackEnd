import { Document, ObjectId } from 'mongoose';

export interface ProductDocument extends Document {
  _id: ObjectId;
  name: string;
  price: number;
}
