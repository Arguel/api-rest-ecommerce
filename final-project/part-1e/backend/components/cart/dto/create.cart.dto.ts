import { ICreateProductDto as Product } from '../../product/dto/create.product.dto';

export interface ICreateCartDto {
  id: string;
  timestamp: string;
  products: Array<Product>;
}
