import express from 'express';
import debug from 'debug';
import httpStatus from 'http-status';

const log: debug.IDebugger = debug('app:auth-controller');

class AuthController {
  async addToken(req: express.Request, res: express.Response) {
    req.body.admin = true;
    return res.status(httpStatus.CREATED).send('Variable set successfully');
  }
}

export default new AuthController();
