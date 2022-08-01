import express from 'express';
import cartService from '../services/cart.service';
import debug from 'debug';
import httpStatus from 'http-status';

const log: debug.IDebugger = debug('app:cart-controller');

class CartsMiddleware {
  async validateRequiredCartBodyFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (
      req.body &&
      req.body.timestamp &&
      req.body.name &&
      req.body.price &&
      req.body.stock
    ) {
      next();
    } else {
      res.status(httpStatus.BAD_REQUEST).send({
        error: `Missing required fields {timestamp, name, price, stock}`,
      });
    }
  }

  async validateCartExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const cart = await cartService.readById(req.params.cartId);
      if (cart) {
        next();
      } else {
        res
          .status(httpStatus.NOT_FOUND)
          .send({ error: `Cart ${req.params.userId} not found` });
      }
    } catch (err) {
      res
        .status(httpStatus.NOT_FOUND)
        .send({ error: `Cart ${req.params.cartId} not found` });
    }
  }

  async extractCartId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.body.id = req.params.cartId;
    next();
  }
}

export default new CartsMiddleware();
