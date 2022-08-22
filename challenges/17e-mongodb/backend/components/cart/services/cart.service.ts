import CartsDao from '../daos/cart.filesystem.dao';
import { ICrud } from '../../../common/types/crud.interface';
import { ICreateCartDto } from '../dto/create.cart.dto';
import { ICreateProductDto } from '../../product/dto/create.product.dto';
import FactoryInstance from '../daos/cart.factory.dao';
import { IPatchCartDto } from '../dto/patch.cart.dto';

class CartsService implements ICrud {
  async create(resource: ICreateCartDto): Promise<any> {
    return (await FactoryInstance).create(resource);
  }

  async addProduct(
    id: string,
    resource: Array<ICreateProductDto>
  ): Promise<any> {
    return CartsDao.addProduct(id, resource);
  }

  async deleteById(id: string): Promise<any> {
    return (await FactoryInstance).deleteById(id);
  }

  async deleteProductById(id: string, productId: string): Promise<any> {
    return CartsDao.removeCartProductById(id, productId);
  }

  async list(limit?: number, page?: number): Promise<any> {
    return (await FactoryInstance).list(limit, page);
  }

  async readById(id: string): Promise<any> {
    return (await FactoryInstance).readById(id);
  }

  async patchById(id: string, resource: IPatchCartDto): Promise<any> {
    return (await FactoryInstance).patchById(id, resource);
  }
}

export default new CartsService();
