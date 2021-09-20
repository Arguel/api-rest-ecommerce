import {Schema, model} from "mongoose";

export interface ICart {
  _id?: string;
  products: object[];
}

const cartSchema = new Schema<ICart>({
  products: {type: [Object], required: true},
});

export const CartModel = model<ICart>("Cart", cartSchema);
