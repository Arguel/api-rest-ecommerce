import express from 'express';
import cartsService from '../services/cart.service';
import debug from 'debug';
import httpStatus from 'http-status';

const log: debug.IDebugger = debug('app:carts-controller');

class CartsController {
  async listCarts(req: express.Request, res: express.Response) {
    const carts = await cartsService.list(100, 0);
    res.status(httpStatus.OK).send(carts);
  }

  async getCartProductsById(req: express.Request, res: express.Response) {
    const cart = await cartsService.readById(req.body.id);
    res.status(httpStatus.OK).send(cart.products);
  }

  async createCart(req: express.Request, res: express.Response) {
    const cartId = await cartsService.create(req.body);
    res.status(httpStatus.CREATED).send({ id: cartId });
  }

  async addProduct(req: express.Request, res: express.Response) {
    const cartId = await cartsService.addProduct(req.body.id, req.body.values);
    res.status(httpStatus.CREATED).send({ id: cartId });
  }

  async removeCart(req: express.Request, res: express.Response) {
    log(await cartsService.deleteById(req.body.id));
    res.status(httpStatus.NO_CONTENT).send();
  }

  async removeCartProduct(req: express.Request, res: express.Response) {
    log(
      await cartsService.deleteProductById(
        req.params.cartId,
        req.params.productId
      )
    );
    res.status(httpStatus.NO_CONTENT).send();
  }
}

export default new CartsController();
