import { Document, ObjectId } from 'mongoose';

export interface CustomerDocument extends Document {
  _id: ObjectId;
  name: string;
  phone: string;
  email: string;
  purchases: ObjectId[];
}
