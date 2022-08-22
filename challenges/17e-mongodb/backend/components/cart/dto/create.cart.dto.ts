import { ICreateProductDto } from '../../product/dto/create.product.dto';

export interface ICreateCartDto {
  id: string;
  timestamp: string;
  products: Array<ICreateProductDto>;
}
