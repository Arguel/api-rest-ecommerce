import express from 'express';
import productsService from '../services/product.service';
import debug from 'debug';
import httpStatus from 'http-status';

const log: debug.IDebugger = debug('app:products-controller');

class ProductsController {
  public async listProducts(req: express.Request, res: express.Response) {
    const products = await productsService.list(100, 0);
    res.status(httpStatus.OK).send(products);
  }

  public async getProductById(req: express.Request, res: express.Response) {
    const product = await productsService.readById(req.body.id);
    res.status(httpStatus.OK).send(product);
  }

  public async createProduct(req: express.Request, res: express.Response) {
    const productId = await productsService.create(req.body);
    res.status(httpStatus.CREATED).send({ id: productId });
  }

  public async patch(req: express.Request, res: express.Response) {
    log(await productsService.patchById(req.body.id, req.body));
    res.status(httpStatus.NO_CONTENT).send();
  }

  public async put(req: express.Request, res: express.Response) {
    log(await productsService.putById(req.body.id, req.body));
    res.status(httpStatus.NO_CONTENT).send();
  }

  public async removeProduct(req: express.Request, res: express.Response) {
    log(await productsService.deleteById(req.body.id));
    res.status(httpStatus.NO_CONTENT).send();
  }
}

export default new ProductsController();
