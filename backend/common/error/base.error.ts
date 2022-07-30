import { HttpStatusCodeEnum } from '../types/status.code.enum';

export default class BaseError extends Error {
  readonly log: string;
  readonly methodName: string | undefined;
  readonly httpCode: HttpStatusCodeEnum;
  readonly isOperational: boolean;

  constructor(
    log: string,
    message: string | unknown = log,
    methodName?: string,
    httpCode = HttpStatusCodeEnum.INTERNAL_SERVER,
    isOperational = true
  ) {
    super(<string>message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.log = log;
    if (methodName) this.methodName = methodName;
    this.httpCode = httpCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}
