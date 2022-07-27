import express from 'express';
import productsService from '../services/product.service';
import debug from 'debug';

const log: debug.IDebugger = debug('app:products-controller');
class ProductsController {
  async listProducts(req: express.Request, res: express.Response) {
    const products = await productsService.list(100, 0);
    res.status(200).send(products);
  }

  async getProductById(req: express.Request, res: express.Response) {
    const product = await productsService.readById(req.body.id);
    res.status(200).send(product);
  }

  async createProduct(req: express.Request, res: express.Response) {
    const productId = await productsService.create(req.body);
    res.status(201).send({ id: productId });
  }

  async patch(req: express.Request, res: express.Response) {
    log(await productsService.patchById(req.body.id, req.body));
    res.status(204).send();
  }

  async put(req: express.Request, res: express.Response) {
    const rata = req.body;
    console.log(rata);
    log(await productsService.putById(req.body.id, rata));
    res.status(204).send();
  }

  async removeProduct(req: express.Request, res: express.Response) {
    log(await productsService.deleteById(req.body.id));
    res.status(204).send();
  }
}

export default new ProductsController();
