import { HttpStatusCodeEnum } from '../types/status.code.enum';
import BaseError from '../error/base.error';

export class APIError extends BaseError {
  constructor(
    message: string,
    methodName = '',
    httpCode = HttpStatusCodeEnum.INTERNAL_SERVER,
    isOperational = true
  ) {
    super('', message, methodName, httpCode, isOperational);
  }
}
