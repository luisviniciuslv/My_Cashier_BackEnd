import mongoose, { Document, ObjectId } from 'mongoose';

export interface CustomerDocument extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  phone: string;
  email: string;
  purchases: mongoose.Types.ObjectId[];
}
