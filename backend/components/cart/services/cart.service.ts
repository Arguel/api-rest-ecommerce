import CartsDao from '../daos/cart.filesystem.dao';
import { ICrud } from '../../../common/types/crud.interface';
import { ICreateCartDto } from '../dto/create.cart.dto';
import { IPutCartDto } from '../dto/put.cart.dto';
import { IPatchCartDto } from '../dto/patch.cart.dto';

class CartsService implements ICrud {
  async create(resource: ICreateCartDto) {
    return CartsDao.addCart(resource);
  }

  async deleteById(id: string) {
    return CartsDao.removeCartById(id);
  }

  async list(limit: number, page: number) {
    return CartsDao.getCarts();
  }

  async patchById(id: string, resource: IPatchCartDto): Promise<any> {
    return CartsDao.patchCartById(id, resource);
  }

  async putById(id: string, resource: IPutCartDto): Promise<any> {
    return CartsDao.putCartById(id, resource);
  }

  async readById(id: string) {
    return CartsDao.getCartById(id);
  }
}

export default new CartsService();
