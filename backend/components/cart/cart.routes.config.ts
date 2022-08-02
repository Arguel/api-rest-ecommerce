import CommonRoutesConfig from '../../common/common.routes.config';
import CartController from './controllers/cart.controller';
import CartMiddleware from './middleware/cart.middleware';
import express from 'express';

export default class CartRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'CartRoutes');
  }
  configureRoutes(): express.Application {
    this.app
      .route(`/cart`)
      .get(CartController.listCarts)
      .post(
        CartMiddleware.validateRequiredCartBodyFields,
        CartController.createCart
      );

    this.app.param(`cartId`, CartMiddleware.extractCartId);
    this.app
      .route(`/cart/:cartId`)
      .all(CartMiddleware.validateCartExists)
      .delete(CartController.removeCart);

    this.app
      .route(`/cart/:cartId/products`)
      .all(CartMiddleware.validateCartExists)
      .get([CartController.getCartProductsById])
      .post([
        CartMiddleware.validateRequiredCartBodyFields,
        CartMiddleware.validateProductExists,
        CartController.addProduct,
      ]);

    this.app.delete(`/cart/:cartId/products/:productId`, [
      CartMiddleware.validateCartExists,
      CartController.removeCartProduct,
    ]);

    return this.app;
  }
}
