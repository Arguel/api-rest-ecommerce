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

  public async list(limit = 25, page = 0) {
    return Cart.find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  public async readById(cartId: string) {
    try {
      return Cart.findOne({ _id: cartId }).populate('Cart').exec();
    } catch (err) {
      throw new BaseError('Failed to find cart', err, 'readById');
    }
  }

  public async patchById(cartId: string, cartFields: IPatchCartDto) {
    try {
      const existingCart = await Cart.findOneAndUpdate(
        { _id: cartId },
        { $set: cartFields },
        { new: true }
      ).exec();

      return existingCart;
    } catch (err) {
      if (err instanceof mongoose.Error.ValidationError) {
        const message = Object.values(err.errors).map((prop) => prop.message);
        throw new BadRequestError(message.join('. '), 'patchById');
      }
      throw new BaseError('Failed to update cart', err, 'patchById');
    }
  }

  public async deleteById(cartId: string) {
    try {
      return Cart.deleteOne({ _id: cartId }).exec();
    } catch (err) {
      throw new BaseError('Failed to remove cart', err, 'deleteById');
    }
  }

  public async addProduct(productId: string, cart: ICreateCartDto) {
    try {
      const productIndex: number = cart.products.findIndex(
        (product) => product._id === productId
      );
      cart.products.push(product);
    } catch (err) {
      throw new BaseError('Failed to remove cart', err, 'deleteById');
    }
  }
}

export default new CartsDao();
