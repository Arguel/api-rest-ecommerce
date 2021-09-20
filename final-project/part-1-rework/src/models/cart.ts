import {Schema, model} from "mongoose";

export interface ICart {
  _id?: string;
  products: object[];
  timestamp: string;
}

const cartSchema = new Schema<ICart>({
  _id: String,
  products: {type: [Object], required: true},
  timestamp: {type: String, required: true},
});

export const CartModel = model<ICart>("Cart", cartSchema);
