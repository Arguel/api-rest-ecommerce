import express from 'express';
import httpStatus from 'http-status';
import ErrorHandler from '../../../common/error.handler.config';
import BaseError from '../../../common/error/base.error';

class ErrorMiddleware {
  public async handle(
    err: BaseError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    if (!ErrorHandler.isTrustedError(err)) {
      next(err);
      return;
    }
    ErrorHandler.handleError(err);
  }

  public async routeNotFound(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    res.status(httpStatus.NOT_FOUND).json({
      error: `404 - ${httpStatus['404_MESSAGE']}`,
      description: `Route '${req.originalUrl}' - Method '${req.method}' not found`,
    });
  }
}

export default new ErrorMiddleware();
