import express from 'express';
import productService from '../services/product.service';
import debug from 'debug';

const log: debug.IDebugger = debug('app:products-controller');

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
        error: `Missing required fields timestamp, name, price and stock`,
      });
    }
  }

  async validateSameEmailDoesntExist(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const product = await productService.getProductByEmail(req.body.email);
    if (product) {
      res.status(400).send({ error: `Product email already exists` });
    } else {
      next();
    }
  }

  async validateSameEmailBelongToSameProduct(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const product = await productService.getProductByEmail(req.body.email);
    if (product && product.id === req.params.productId) {
      next();
    } else {
      res.status(400).send({ error: `Invalid email` });
    }
  }

  // Here we need to use an arrow function to bind `this` correctly
  validatePatchEmail = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (req.body.email) {
      log('Validating email', req.body.email);

      this.validateSameEmailBelongToSameProduct(req, res, next);
    } else {
      next();
    }
  };

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
