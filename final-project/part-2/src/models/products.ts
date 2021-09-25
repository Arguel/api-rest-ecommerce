import {Schema, model, Model, Types} from "mongoose";

export interface IProduct {
  _id?: Types.ObjectId;
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
  timestamp: {type: String, required: true},
  name: {type: String, required: true},
  description: {type: String, required: true},
  code: {type: Number, required: true},
  thumbnail: {type: String, required: true},
  price: {type: Number, required: true},
  stock: {type: Number, required: true},
});

export const ProductModel: Model<IProduct> = model<IProduct>(
  "Product",
  productSchema,
);
