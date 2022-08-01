import express from 'express';
import productService from '../services/product.service';
import debug from 'debug';
import { HttpStatusCodeEnum } from '../../../common/types/status.code.enum';

const log: debug.IDebugger = debug('app:product-controller');

class ProductsMiddleware {
  async validateRequiredProductBodyFields(
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
      res.status(HttpStatusCodeEnum.BAD_REQUEST).send({
        error: `Missing required fields {timestamp, name, price, stock}`,
      });
    }
  }

  async validateProductExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const product = await productService.readById(req.params.productId);
      if (product) next();
    } catch (err) {
      const errMessage = `Product ${req.params.productId} not found`;
      res.status(HttpStatusCodeEnum.NOT_FOUND).send({ error: errMessage });
    }
  }

  async extractProductId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.body.id = req.params.productId;
    next();
  }
}

export default new ProductsMiddleware();
