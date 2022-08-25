import { ICreateCartDto } from '../../components/cart/dto/create.cart.dto';
import { ICreateProductDto } from '../../components/product/dto/create.product.dto';

export interface ICrud {
  create: (resource: any) => Promise<any>;
  list: (limit?: number, page?: number) => Promise<any>;
  readById: (id: string) => Promise<any>;
  patchById: (id: string, resource: any) => Promise<any>;
  deleteById: (id: string) => Promise<any>;
}

export interface ICrudCart extends ICrud {
  addProduct: (
    product: ICreateProductDto,
    cart: ICreateCartDto
  ) => Promise<any>;
  deleteProductById: (
    product: ICreateProductDto,
    cart: ICreateCartDto
  ) => Promise<any>;
}
