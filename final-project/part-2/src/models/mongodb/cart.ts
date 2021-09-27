import {Schema, model, Model, Types} from "mongoose";

export interface ICart {
  _id?: Types.ObjectId;
  products: object[];
  timestamp: string;
}

const cartSchema = new Schema<ICart>({
  products: {type: [Object], required: true},
  timestamp: {type: String, required: true},
});

export const CartModel: Model<ICart> = model<ICart>("Cart", cartSchema);
