import {Schema, model} from "mongoose";

interface CartProduct {
  productId: string;
  timestamp: string;
  name: string;
  description: string;
  code: number;
  thumbnail: string;
  price: number;
  stock: number;
}

const cartProductSchema = new Schema<CartProduct>({
  productId: {type: String, required: true},
  timestamp: {type: String, required: true},
  name: {type: String, required: true},
  description: {type: String, required: true},
  code: {type: Number, required: true},
  thumbnail: {type: String, required: true},
  price: {type: Number, required: true},
  stock: {type: Number, required: true},
});

export const CartProductModel = model<CartProduct>(
  "CartProduct",
  cartProductSchema,
);
