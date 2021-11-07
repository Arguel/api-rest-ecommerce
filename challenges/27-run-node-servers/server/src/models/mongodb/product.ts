import {Schema, model} from "mongoose";
import {IProduct} from "../../libs/interfaces/models.interfaces";

const productSchema = new Schema<IProduct>({
  timestamp: {type: String, required: true},
  name: {type: String, required: true},
  description: {type: String, required: true},
  code: {type: Number, required: true},
  thumbnail: {type: String, required: true},
  price: {type: Number, required: true},
  stock: {type: Number, required: true},
});

export const ProductModel = model<IProduct>("Product", productSchema);
