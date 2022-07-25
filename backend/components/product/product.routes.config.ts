import CommonRoutesConfig from '../../common/common.routes.config';
import express from 'express';

export default class ProductsRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'ProductsRoutes');
  }
  configureRoutes(): express.Application {
    this.app.route('/products').get((req, res) => res.send('test'));

    return this.app;
  }
}
