import express from 'express';
import ErrorHandler from '../../../common/error.handler.config';
import BaseError from '../../../common/error/base.error';

class ErrorMiddleware {
  async handle(
    err: BaseError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (!ErrorHandler.isTrustedError(err)) {
      next(err);
      return;
    }
    ErrorHandler.handleError(err);
  }
}

export default new ErrorMiddleware();
