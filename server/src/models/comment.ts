import mongoose from 'mongoose';
import { carType } from './car';

const Schema = mongoose.Schema;

const CommentSchema = new mongoose.Schema(
  {
    createdDate: { type: String, required: true },
    comment: { type: String, required: true, trim: true },
    author: { type: String, required: false },
    car: { type: Schema.Types.ObjectId, ref: 'Car' },
  },
  { timestamps: true },
);

export type commentType = {
  createdDate: string;
  comment: string;
  author: number;
  car?: carType;
};

const Car = mongoose.model('Comment', CommentSchema);

export default Car;
