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
import UsersRoutes from './components/user/user.routes.config';
import http from 'http';
import SocketServer from './services/socket/socket.service';
import MessagesRoutes from './components/message/message.routes.config';
import socketio from 'socket.io';
import sessionMiddleware from './components/app/middleware/session.middleware';
import AuthRoutes from './services/auth/auth.routes.config';

// App
const app: express.Application = express();
const debugLog: debug.IDebugger = debug('app');
const routes: Array<CommonRoutesConfig> = [];

// Middlewares
app.use(logsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(sessionMiddleware);

// Routes config
routes.push(new ProductsRoutes(app));
routes.push(new CartRoutes(app));
routes.push(new UsersRoutes(app));
routes.push(new MessagesRoutes(app));
routes.push(new AuthRoutes(app));
routes.forEach((route: CommonRoutesConfig): void => {
  debugLog(`Routes configured for ${route.getName()}`);
});

// Errors
app.use(ErrorMiddleware.handle);
// Manage non-existent routes
app.use(ErrorMiddleware.routeNotFound);

process.on('uncaughtException', async (error: Error): Promise<void> => {
  ErrorHandler.handleError(error);
  if (!ErrorHandler.isTrustedError(error)) process.exit(1);
});
process.on('unhandledRejection', (reason: Error): never => {
  throw reason;
});

// Server
const httpServer: http.Server = http.createServer(app);

// Chat server
const ioServer: socketio.Server = new socketio.Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
ioServer.on('connection', (socket) => {
  new SocketServer(ioServer, socket);
});

export default httpServer;
