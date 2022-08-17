import express from 'express';
import {EPermissionLevel} from '../types/common.permissionlevel.enum';
import debug from 'debug';

const log: debug.IDebugger = debug('app:common-permission-middleware');

class CommonPermissionMiddleware {
  minimumEPermissionLevelRequired(requiredEPermissionLevel: EPermissionLevel) {
    return (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const userEPermissionLevel = parseInt(
          res.locals.jwt.permissionLevel
        );
        if (userEPermissionLevel & requiredEPermissionLevel) {
          next();
        } else {
          res.status(403).send();
        }
      } catch (e) {
        log(e);
      }
    };
  }

  async onlySameUserOrAdminCanDoThisAction(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const userEPermissionLevel = parseInt(res.locals.jwt.permissionLevel);
    if (
      req.params &&
      req.params.userId &&
      req.params.userId === res.locals.jwt.userId
    ) {
      return next();
    } else {
      if (userEPermissionLevel & EPermissionLevel.ADMIN_PERMISSION) {
        return next();
      } else {
        return res.status(403).send();
      }
    }
  }

  async onlyAdminCanDoThisAction(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const userEPermissionLevel = parseInt(res.locals.jwt.permissionLevel);
    if (userEPermissionLevel & EPermissionLevel.ADMIN_PERMISSION) {
      return next();
    } else {
      return res.status(403).send();
    }
  }
}

export default new CommonPermissionMiddleware();
