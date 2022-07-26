import express from 'express';
import debug from 'debug';
import winston from 'winston';
import expressWinston from 'express-winston';
import cors from 'cors';
import helmet from 'helmet';
import CommonRoutesConfig from './common/common.routes.config';
import ProductsRoutes from './components/product/product.routes.config';

const app: express.Application = express();
const debugLog: debug.IDebugger = debug('app');
const routes: Array<CommonRoutesConfig> = [];

// Logger config
const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  ),
};

if (!process.env.DEBUG) {
  loggerOptions.meta = false; // when not debugging, make terse
  if (typeof global.it === 'function') {
    loggerOptions.level = 'http'; // for non-debug test runs, squelch entirely
  }
}

// Middlewares
app.use(expressWinston.logger(loggerOptions));
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
