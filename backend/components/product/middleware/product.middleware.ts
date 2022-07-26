import express from 'express';
import productService from '../services/product.service';
import debug from 'debug';

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
      res.status(400).send({
        error: `Missing required fields {timestamp, name, price, stock}`,
      });
    }
  }

  async validateProductExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const product = await productService.readById(req.params.productId);
    if (product) {
      next();
    } else {
      res.status(404).send({
        error: `Product ${req.params.productId} not found`,
      });
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
