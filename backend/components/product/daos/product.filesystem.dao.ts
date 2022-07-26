import fs from 'fs';
import debug from 'debug';
import { ICreateProductDto } from '../dto/create.product.dto';
import { IPatchProductDto } from '../dto/patch.product.dto';
import { IPutProductDto } from '../dto/put.product.dto';
import { nanoid } from 'nanoid';
// @ts-expect-error
import { localDB } from '@abmsourav/localdb';

const log: debug.IDebugger = debug('app:filesystem-dao');

class ProductsDao {
  private products: Array<ICreateProductDto> = [];
  private filename = './products.filesystem.db.json';
  private crud = localDB(this.filename);

  constructor() {
    this.init();
    log('Created new instance of ProductsDao');
  }

  init(): void {
    try {
      fs.readFileSync(this.filename);
    } catch (error) {
      fs.writeFileSync(this.filename, '');
      log('Database not found, created products.db');
    }
  }

  async addProduct(product: ICreateProductDto) {
    product.id = nanoid();
    this.products.push(product);
    this.products = await this.crud.set(product);
    return product.id;
  }

  async getProducts() {
    return await this.crud.get();
  }

  async getProductById(productId: string) {
    return await this.crud.search('id', productId);
  }

  async putProductById(productId: string, product: IPutProductDto) {
    await this.crud.update({ id: productId }, product);
    return `${product.id} updated via put`;
  }

  async patchProductById(productId: string, product: IPatchProductDto) {
    const allowedPatchFields = [
      'name',
      'description',
      'productCode',
      'thumbnailUrl',
      'price',
      'stock',
    ] as const;
    const newValues: IPatchProductDto = {};
    allowedPatchFields.forEach((field) => {
      if (field in product) {
        // @ts-ignore
        newValues[field] = product[field];
      }
    });
    this.crud.update({ id: productId }, { ...product, ...newValues });
    return `${product.id} patched`;
  }

  async removeProductById(productId: string) {
    const objIndex = this.products.findIndex(
      (obj: { id: string }) => obj.id === productId
    );
    this.products.splice(objIndex, 1);
    return `${productId} removed`;
  }
}

export default new ProductsDao();
