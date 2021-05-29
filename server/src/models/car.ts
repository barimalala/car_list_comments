import mongoose from 'mongoose';
import { commentType } from './comment';

const Schema = mongoose.Schema;

const CarSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxLength: 50 },
    detail: { type: String, required: true },
    year: { type: String, required: true, maxLength: 4 },
    type: { type: String, default: 'SUV', enum: ['SUV', '4x4', 'Familial'] },
    price: { type: String, required: true },
    image: { type: String },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  },
  { timestamps: true },
);

export type carType = {
  name: string;
  detail: string;
  year: number;
  type: 'SUV' | '4x4' | 'Familial';
  price: number;
  image: string;
  comments?: commentType;
};

const Car = mongoose.model('Car', CarSchema);

export default Car;
