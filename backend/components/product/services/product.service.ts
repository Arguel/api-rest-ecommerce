import ProductsDao from '../daos/product.filesystem.dao';
import { ICrud } from '../../../common/types/crud.interface';
import { ICreateProductDto } from '../dto/create.product.dto';
import { IPutProductDto } from '../dto/put.product.dto';
import { IPatchProductDto } from '../dto/patch.product.dto';

class ProductsService implements ICrud {
  async create(resource: ICreateProductDto) {
    return ProductsDao.addProduct(resource);
  }

  async deleteById(id: string) {
    return ProductsDao.removeProductById(id);
  }

  async list(limit: number, page: number) {
    return ProductsDao.getProducts();
  }

  async patchById(id: string, resource: IPatchProductDto): Promise<any> {
    return ProductsDao.patchProductById(id, resource);
  }

  async putById(id: string, resource: IPutProductDto): Promise<any> {
    return ProductsDao.putProductById(id, resource);
  }

  async readById(id: string) {
    return ProductsDao.getProductById(id);
  }
}

export default new ProductsService();
