import express from 'express';
import productService from '../services/product.service';
import debug from 'debug';
import httpStatus from 'http-status';

const log: debug.IDebugger = debug('app:product-controller');

class ProductsMiddleware {
  public async validateRequiredProductBodyFields(
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

  public async validateProductExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const product = await productService.readById(req.params.productId);
      if (product) {
        next();
      } else {
        res
          .status(httpStatus.NOT_FOUND)
          .send({ error: `Product ${req.params.userId} not found` });
      }
    } catch (err) {
      res
        .status(httpStatus.NOT_FOUND)
        .send({ error: `Product ${req.params.productId} not found` });
    }
  }

  public async extractProductId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.body.id = req.params.productId;
    next();
  }
}

export default new ProductsMiddleware();
