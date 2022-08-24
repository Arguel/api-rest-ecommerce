import mongooseService from '../../../services/mongoose/mongoose.service';
import { nanoid } from 'nanoid';
import debug from 'debug';
import { ICreateCartDto } from '../dto/create.cart.dto';
import { IPatchCartDto } from '../dto/patch.cart.dto';
import BaseError from '../../../common/error/base.error';
import { ICrud } from '../../../common/types/crud.interface';
import { BadRequestError } from '../../../common/error/bad.request.error';

const log: debug.IDebugger = debug('app:carts-dao');

export class CartsDao implements ICrud {
  public async create() {
    return ``;
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
