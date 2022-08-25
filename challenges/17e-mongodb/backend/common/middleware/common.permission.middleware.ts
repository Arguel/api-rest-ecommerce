import express from 'express';
import { EPermissionLevel } from '../types/common.permissionlevel.enum';
import debug from 'debug';
import httpStatus from 'http-status';

const log: debug.IDebugger = debug('app:common-permission-middleware');

class CommonPermissionMiddleware {
  async isAdmin(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const userPermissionLevel = 8;
    if (userPermissionLevel & EPermissionLevel.ADMIN_PERMISSION) {
      return next();
    } else {
      return res
        .status(httpStatus.FORBIDDEN)
        .send('Insufficient permissions, request rejected');
    }
  }
}

export default new CommonPermissionMiddleware();
