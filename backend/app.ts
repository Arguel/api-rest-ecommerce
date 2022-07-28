import express from 'express';
import debug from 'debug';
import cors from 'cors';
import helmet from 'helmet';
import CommonRoutesConfig from './common/common.routes.config';
import ProductsRoutes from './components/product/product.routes.config';
import expressWinston from './components/app/middleware/logs.middleware';

const app: express.Application = express();
const debugLog: debug.IDebugger = debug('app');
const routes: Array<CommonRoutesConfig> = [];

// Middlewares
app.use(expressWinston);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());

// Routes config
routes.push(new ProductsRoutes(app));
routes.forEach((route: CommonRoutesConfig) => {
  debugLog(`Routes configured for ${route.getName()}`);
});

export default app;
