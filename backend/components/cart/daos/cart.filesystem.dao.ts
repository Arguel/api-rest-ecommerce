import fs from 'fs';
import debug from 'debug';
import { ICreateCartDto } from '../dto/create.cart.dto';
import { nanoid } from 'nanoid';
import path from 'path';
// @ts-expect-error
import { localDB } from '@abmsourav/localdb';
import BaseError from '../../../common/error/base.error';
import { ICreateProductDto as IProduct } from '../../product/dto/create.product.dto';

const log: debug.IDebugger = debug('app:filesystem-dao');

class CartsDao {
  private readonly filename = path.join(__dirname, 'carts.filesystem.db.json');
  private readonly crud = localDB(this.filename);

  constructor() {
    this.init();
    log('Created new instance of CartsDao');
  }

  init(): void {
    if (!fs.existsSync(this.filename)) {
      fs.writeFileSync(this.filename, '');
      log('Database not found, created carts.db');
    }
  }

  async addCart(cart: ICreateCartDto) {
    try {
      cart.id = nanoid();
      cart.timestamp = new Date().toUTCString();
      await this.crud.set(cart);
      return cart.id;
    } catch (err) {
      throw new BaseError('Failed to save cart', err, 'addCart');
    }
  }

  async addProduct(cartId: string, products: Array<IProduct>) {
    try {
      const cart = await this.crud.search('id', cartId);
      const allowedPutFields = ['products'];
      const newProducts = cart.products.concat(products);
      await this.crud.update(
        { id: cartId },
        { products: newProducts },
        allowedPutFields
      );
      return `${cart.id} updated`;
    } catch (err) {
      throw new BaseError('Failed to save cart', err, 'addCart');
    }
  }

  async getCarts() {
    try {
      return await this.crud.get();
    } catch (err) {
      throw new BaseError('Carts could not be loaded', err, 'getCarts');
    }
  }

  async getCartById(cartId: string) {
    try {
      return await this.crud.search('id', cartId);
    } catch (err) {
      throw new BaseError('Could not get the cart', err, 'getCartById');
    }
  }

  async removeCartById(cartId: string) {
    try {
      await this.crud.remove({ id: cartId });
      return `${cartId} removed`;
    } catch (err) {
      throw new BaseError('Failed to remove cart', err, 'removeCartById');
    }
  }

  async removeCartProductById(cartId: string, productId: string) {
    try {
      const cart = await this.crud.search('id', cartId);
      const allowedPutFields = ['products'];
      const newProducts = cart.products.filter(
        (product: IProduct) => product.id !== productId
      );
      await this.crud.update(
        { id: cartId },
        { products: newProducts },
        allowedPutFields
      );
      return `${cart.id} updated`;
    } catch (err) {
      throw new BaseError(
        'Failed to remove product',
        err,
        'removeCartProductById'
      );
    }
  }
}

export default new CartsDao();
