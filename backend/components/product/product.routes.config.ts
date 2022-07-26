import CommonRoutesConfig from '../../common/common.routes.config';
import ProductsController from './controllers/product.controller';
import ProductsMiddleware from './middleware/product.middleware';
import express from 'express';

export default class ProductsRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'ProductsRoutes');
  }
  configureRoutes(): express.Application {
    this.app.route(`/users`).get(ProductsController.listProducts).post(
      ProductsMiddleware.validateRequiredProductBodyFields,
      //ProductsMiddleware.validateSameEmailDoesntExist,
      ProductsController.createProduct
    );

    this.app.param(`userId`, ProductsMiddleware.extractProductId);
    this.app
      .route(`/users/:userId`)
      .all(ProductsMiddleware.validateProductExists)
      .get(ProductsController.getProductById)
      .delete(ProductsController.removeProduct);

    this.app.put(`/users/:userId`, [
      ProductsMiddleware.validateRequiredProductBodyFields,
      //ProductsMiddleware.validateSameEmailBelongToSameProduct,
      ProductsController.put,
    ]);

    this.app.patch(`/users/:userId`, [
      //ProductsMiddleware.validatePatchEmail,
      ProductsController.patch,
    ]);

    return this.app;
  }
}
