import {Schema, model, Model} from "mongoose";
import {IProduct} from "../../utils/modelsInterfaces";

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
