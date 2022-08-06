import express from 'express';
import cartService from '../services/cart.service';
import debug from 'debug';
import httpStatus from 'http-status';
import productService from '../../product/services/product.service';
import { ICreateProductDto as IProduct } from '../../product/dto/create.product.dto';

const log: debug.IDebugger = debug('app:cart-controller');

class CartsMiddleware {
  async validateRequiredCartBodyFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.body && req.body.products) {
      next();
    } else {
      res.status(httpStatus.BAD_REQUEST).send({
        error: `Missing required fields {products}`,
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

  async validateProductExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const values: Array<IProduct> = await Promise.all(
        req.body.products.map(async (productId: string) => {
          const product = await productService.readById(productId);
          if (product) return product;
        })
      );
      if (values) {
        req.body.values = values;
        next();
      } else {
        res.status(httpStatus.NOT_FOUND).send({ error: `Products not found` });
      }
    } catch (err) {
      res.status(httpStatus.NOT_FOUND).send({ error: `Products not found` });
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
