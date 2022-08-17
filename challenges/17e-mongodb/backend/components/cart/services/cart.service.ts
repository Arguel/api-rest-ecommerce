import CartsDao from '../daos/cart.filesystem.dao';
import { ICrud } from '../../../common/types/crud.interface';
import { ICreateCartDto } from '../dto/create.cart.dto';
import { ICreateProductDto as IProduct } from '../../product/dto/create.product.dto';

class CartsService implements ICrud {
  async create(resource: ICreateCartDto) {
    return CartsDao.addCart(resource);
  }

  async addProduct(id: string, resource: Array<IProduct>) {
    return CartsDao.addProduct(id, resource);
  }

  async deleteById(id: string) {
    return CartsDao.removeCartById(id);
  }

  async deleteProductById(id: string, productId: string) {
    return CartsDao.removeCartProductById(id, productId);
  }

  async list(limit?: number, page?: number) {
    return CartsDao.getCarts();
  }

  async readById(id: string) {
    return CartsDao.getCartById(id);
  }

  async putById() {
    return ``;
  }

  async patchById() {
    return ``;
  }
}

export default new CartsService();
