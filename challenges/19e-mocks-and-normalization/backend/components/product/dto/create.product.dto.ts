import mongoose from 'mongoose';

export interface ICreateProductDto extends mongoose.Document {
  id: string;
  name: string;
  description?: string;
  productCode?: number;
  thumbnailUrl?: string;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt?: Date;
}
