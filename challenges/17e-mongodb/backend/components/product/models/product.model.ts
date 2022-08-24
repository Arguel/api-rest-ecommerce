import mongoose from 'mongoose';
import { ICreateProductDto } from '../dto/create.product.dto';

export const productSchema = new mongoose.Schema<ICreateProductDto>(
  {
    _id: { type: String, required: true },
    timestamp: { type: String, required: true },
    name: { type: String, required: true },
    description: String,
    productCode: Number,
    thumbnailUrl: String,
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Product = mongoose.model('Product', productSchema);
