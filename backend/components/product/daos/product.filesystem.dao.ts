import fs from 'fs';
import debug from 'debug';
import { ICreateProductDto } from '../dto/create.product.dto';
import { IPatchProductDto } from '../dto/patch.product.dto';
import { IPutProductDto } from '../dto/put.product.dto';
import { nanoid } from 'nanoid';
import path from 'path';
// @ts-expect-error
import { localDB } from '@abmsourav/localdb';

const log: debug.IDebugger = debug('app:filesystem-dao');

class ProductsDao {
  private filename = path.join(__dirname, 'products.filesystem.db.json');
  private crud = localDB(this.filename);

  constructor() {
    this.init();
    log('Created new instance of ProductsDao');
  }

  init(): void {
    if (!fs.existsSync(this.filename)) {
      fs.writeFileSync(this.filename, '');
      log('Database not found, created products.db');
    }
  }

  async addProduct(product: ICreateProductDto) {
    product.id = nanoid();
    product.timestamp = new Date().toUTCString();
    await this.crud.set(product);
    return product.id;
  }

  async getProducts() {
    return await this.crud.get();
  }

  async getProductById(productId: string) {
    return await this.crud.search('id', productId);
  }

  async putProductById(productId: string, product: IPutProductDto) {
    const allowedPutFields = [
      'timestamp',
      'name',
      'description',
      'productCode',
      'thumbnailUrl',
      'price',
      'stock',
    ] as const;
    await this.crud.update({ id: productId }, product, allowedPutFields);
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
    await this.crud.update({ id: productId }, product, allowedPatchFields);
    return `${product.id} patched`;
  }

  async removeProductById(productId: string) {
    await this.crud.remove({ id: productId });
    return `${productId} removed`;
  }
}

export default new ProductsDao();
