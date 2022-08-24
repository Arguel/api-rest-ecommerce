import mongoose from 'mongoose';
import { nanoid } from 'nanoid';
import debug from 'debug';
import { ICreateCartDto } from '../dto/create.cart.dto';
import { IPatchCartDto } from '../dto/patch.cart.dto';
import BaseError from '../../../common/error/base.error';
import { ICrud } from '../../../common/types/crud.interface';
import { BadRequestError } from '../../../common/error/bad.request.error';
import { Cart } from '../models/cart.model';

const log: debug.IDebugger = debug('app:carts-dao');

export class CartsDao implements ICrud {
  constructor() {
    log('Created new instance of CartsDao');
  }

  public async create(cartFields: ICreateCartDto) {
    try {
      const cartId: string = nanoid();
      const cart = new Cart({
        ...cartFields,
        _id: cartId,
      });
      await cart.save();
      return cart.id;
    } catch (err) {
      if (err instanceof mongoose.Error.ValidationError) {
        const message = Object.values(err.errors).map((prop) => prop.message);
        throw new BadRequestError(message.join('. '), 'create');
      }
      throw new BaseError('Failed to save cart', err, 'create');
    }
  }

  public async list() {
    return ``;
  }

  public async readById() {
    return ``;
  }

  public async patchById() {
    return ``;
  }

  public async deleteById() {
    return ``;
  }
}

export default new CartsDao();
