import CommonRoutesConfig from '../../common/common.routes.config';
import AuthController from './controllers/auth.controller';
import JwtMiddleware from './middleware/jwt.middleware';
import AuthMiddleware from './middleware/auth.middleware';
import express from 'express';

export default class AuthRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'AuthRoutes');
  }

  configureRoutes(): express.Application {
    this.app.post(`/auth`, [
      AuthMiddleware.validateBodyRequest,
      AuthMiddleware.verifyUserPassword,
      AuthController.createJWT,
    ]);
    this.app.post(`/auth/refresh-token`, [
      JwtMiddleware.validJWTNeeded,
      JwtMiddleware.verifyRefreshBodyField,
      JwtMiddleware.validRefreshNeeded,
      AuthController.createJWT,
    ]);
    return this.app;
  }
}
