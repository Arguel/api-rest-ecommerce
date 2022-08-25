import mongoose from 'mongoose';
import { ICreateProductDto } from '../../product/dto/create.product.dto';

export interface ICreateCartDto extends mongoose.Document {
  id: string;
  timestamp: string;
  products: Array<ICartProduct>;
}

export interface ICartProduct {
  data: mongoose.Types.ObjectId | ICreateProductDto;
  quantity: number;
}
