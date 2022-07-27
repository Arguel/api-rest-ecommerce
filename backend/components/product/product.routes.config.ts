import CommonRoutesConfig from '../../common/common.routes.config';
import ProductsController from './controllers/product.controller';
import ProductsMiddleware from './middleware/product.middleware';
import express from 'express';

export default class ProductsRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'ProductsRoutes');
  }
  configureRoutes(): express.Application {
    this.app.route(`/products`).get(ProductsController.listProducts).post(
      ProductsMiddleware.validateRequiredProductBodyFields,
      //ProductsMiddleware.validateSameEmailDoesntExist,
      ProductsController.createProduct
    );

    this.app.param(`productId`, ProductsMiddleware.extractProductId);
    this.app
      .route(`/products/:productId`)
      .all(ProductsMiddleware.validateProductExists)
      .get(ProductsController.getProductById)
      .delete(ProductsController.removeProduct);

    this.app.put(`/products/:productId`, [
      ProductsMiddleware.validateRequiredProductBodyFields,
      //ProductsMiddleware.validateSameEmailBelongToSameProduct,
      ProductsController.put,
    ]);

    this.app.patch(`/products/:productId`, [
      //ProductsMiddleware.validatePatchEmail,
      ProductsController.patch,
    ]);

    return this.app;
  }
}
