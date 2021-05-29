import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CarSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxLength: 50 },
    detail: { type: String, required: true },
    year: { type: String, required: true, maxLength: 4 },
    type: { type: String, default: 'SUV', enum: ['SUV', '4x4', 'Familial'] },
    price: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: true },
);

const Car = mongoose.model('Car', CarSchema);

export default Car;
