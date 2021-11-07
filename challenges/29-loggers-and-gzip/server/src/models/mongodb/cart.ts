import {Schema, model} from "mongoose";
import {ICart} from "../../libs/interfaces/models.interfaces";

const cartSchema = new Schema<ICart>({
  products: {type: [Object], required: true},
  timestamp: {type: String, required: true},
});

export const CartModel = model<ICart>("Cart", cartSchema);
