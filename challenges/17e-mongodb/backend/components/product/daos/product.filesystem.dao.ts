import fs from 'fs';
import debug from 'debug';
import { ICreateProductDto } from '../dto/create.product.dto';
import { IPatchProductDto } from '../dto/patch.product.dto';
import { IPutProductDto } from '../dto/put.product.dto';
import { nanoid } from 'nanoid';
import path from 'path';
// @ts-expect-error
import { localDB } from '@abmsourav/localdb';
import BaseError from '../../../common/error/base.error';

const log: debug.IDebugger = debug('app:filesystem-dao');

class ProductsDao {
  private readonly filename = path.join(
    __dirname,
    'products.filesystem.db.json'
  );
  private readonly crud = localDB(this.filename);

  constructor() {
    this.init();
    log('Created new instance of ProductsDao');
  }

  private init(): void {
    if (!fs.existsSync(this.filename)) {
      fs.writeFileSync(this.filename, '');
      log('Database not found, created products.db');
    }
  }

  public async addProduct(product: ICreateProductDto) {
    try {
      product.id = nanoid();
      product.timestamp = new Date().toUTCString();
      await this.crud.set(product);
      return product.id;
    } catch (err) {
      throw new BaseError('Failed to save product', err, 'addProduct');
    }
  }

  public async getProducts() {
    try {
      return await this.crud.get();
    } catch (err) {
      throw new BaseError('Products could not be loaded', err, 'getProducts');
    }
  }

  public async getProductById(productId: string) {
    try {
      return await this.crud.search('id', productId);
    } catch (err) {
      throw new BaseError('Could not get the product', err, 'getProductById');
    }
  }

  public async putProductById(productId: string, product: IPutProductDto) {
    try {
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
    } catch (err) {
      throw new BaseError('Failed to update product', err, 'putProductById');
    }
  }

  public async patchProductById(productId: string, product: IPatchProductDto) {
    try {
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
    } catch (err) {
      throw new BaseError('Failed to update product', err, 'patchProductById');
    }
  }

  public async removeProductById(productId: string) {
    try {
      await this.crud.remove({ id: productId });
      return `${productId} removed`;
    } catch (err) {
      throw new BaseError('Failed to remove product', err, 'removeProductById');
    }
  }
}

export default new ProductsDao();
