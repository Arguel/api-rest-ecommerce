import {Schema, model} from "mongoose";

export interface IProduct {
  _id?: string;
  timestamp: string;
  name: string;
  description: string;
  code: number;
  thumbnail: string;
  price: number;
  stock: number;
  quantityOnCart?: number;
}

const productSchema = new Schema<IProduct>({
  _id: String,
  timestamp: {type: String, required: true},
  name: {type: String, required: true},
  description: {type: String, required: true},
  code: {type: Number, required: true},
  thumbnail: {type: String, required: true},
  price: {type: Number, required: true},
  stock: {type: Number, required: true},
  quantityOnCart: Number,
});

export const ProductModel = model<IProduct>("Product", productSchema);
