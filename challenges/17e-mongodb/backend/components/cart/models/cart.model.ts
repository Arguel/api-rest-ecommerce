import mongoose from 'mongoose';
import { ICreateCartDto } from '../dto/create.cart.dto';

export const cartSchema = new mongoose.Schema<ICreateCartDto>(
  {
    _id: { type: String, required: true },
    products: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Cart = mongoose.model('Cart', cartSchema);
