import CommonRoutesConfig from '../../common/common.routes.config';
import CartController from './controllers/cart.controller';
import CartMiddleware from './middleware/cart.middleware';
import express from 'express';

export default class CartRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'CartRoutes');
  }
  configureRoutes(): express.Application {
    this.app.route(`/cart`).get(CartController.listCarts).post(
      CartMiddleware.validateRequiredCartBodyFields,
      //CartMiddleware.validateSameEmailDoesntExist,
      CartController.createCart
    );

    this.app.param(`cartId`, CartMiddleware.extractCartId);
    this.app
      .route(`/cart/:cartId`)
      .all(CartMiddleware.validateCartExists)
      .get(CartController.getCartById)
      .delete(CartController.removeCart);

    this.app.put(`/cart/:cartId`, [
      CartMiddleware.validateRequiredCartBodyFields,
      //CartMiddleware.validateSameEmailBelongToSameCart,
      CartController.put,
    ]);

    this.app.patch(`/cart/:cartId`, [
      //CartMiddleware.validatePatchEmail,
      CartController.patch,
    ]);

    return this.app;
  }
}
