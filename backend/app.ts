import express from 'express';
import debug from 'debug';
import cors from 'cors';
import helmet from 'helmet';
import CommonRoutesConfig from './common/common.routes.config';
import ProductsRoutes from './components/product/product.routes.config';
import logsMiddleware from './components/app/middleware/logs.middleware';
import ErrorMiddleware from './components/app/middleware/error.middleware';
import ErrorHandler from './common/error.handler.config';
import CartRoutes from './components/cart/cart.routes.config';

const app: express.Application = express();
const debugLog: debug.IDebugger = debug('app');
const routes: Array<CommonRoutesConfig> = [];

// Middlewares
app.use(logsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(ErrorMiddleware.handle);

// Routes config
routes.push(new ProductsRoutes(app));
routes.push(new CartRoutes(app));
routes.forEach((route: CommonRoutesConfig): void => {
  debugLog(`Routes configured for ${route.getName()}`);
});

// Error
process.on('uncaughtException', async (error: Error): Promise<void> => {
  ErrorHandler.handleError(error);
  if (!ErrorHandler.isTrustedError(error)) process.exit(1);
});
process.on('unhandledRejection', (reason: Error): never => {
  throw reason;
});

export default app;
