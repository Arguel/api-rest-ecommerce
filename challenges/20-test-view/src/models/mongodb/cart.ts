import {Schema, model, Model} from "mongoose";
import {ICart} from "../../utils/modelsInterfaces";

const cartSchema = new Schema<ICart>({
  products: {type: [Object], required: true},
  timestamp: {type: String, required: true},
});

export const CartModel: Model<ICart> = model<ICart>("Cart", cartSchema);
