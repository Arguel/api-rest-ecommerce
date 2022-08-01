import fs from 'fs';
import debug from 'debug';
import { ICreateCartDto } from '../dto/create.cart.dto';
import { IPatchCartDto } from '../dto/patch.cart.dto';
import { IPutCartDto } from '../dto/put.cart.dto';
import { nanoid } from 'nanoid';
import path from 'path';
// @ts-expect-error
import { localDB } from '@abmsourav/localdb';
import BaseError from '../../../common/error/base.error';

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

  async getCarts() {
    try {
      return await this.crud.get();
    } catch (err) {
      throw new BaseError('Carts could not be loaded', err, 'getCarts');
    }
  }

  async getCartById(cartId: string) {
    try {
      console.log('soy yo');
      return await this.crud.search('id', cartId);
    } catch (err) {
      throw new BaseError('Could not get the cart', err, 'getCartById');
    }
  }

  async putCartById(cartId: string, cart: IPutCartDto) {
    try {
      const allowedPutFields = [
        'timestamp',
        'name',
        'description',
        'cartCode',
        'thumbnailUrl',
        'price',
        'stock',
      ] as const;
      await this.crud.update({ id: cartId }, cart, allowedPutFields);
      return `${cart.id} updated via put`;
    } catch (err) {
      throw new BaseError('Failed to update cart', err, 'putCartById');
    }
  }

  async patchCartById(cartId: string, cart: IPatchCartDto) {
    try {
      const allowedPatchFields = [
        'name',
        'description',
        'cartCode',
        'thumbnailUrl',
        'price',
        'stock',
      ] as const;
      await this.crud.update({ id: cartId }, cart, allowedPatchFields);
      return `${cart.id} patched`;
    } catch (err) {
      throw new BaseError('Failed to update cart', err, 'patchCartById');
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
}

export default new CartsDao();
