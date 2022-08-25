import express from 'express';
import usersService from '../../../components/user/services/user.service';
import * as argon2 from 'argon2';

class AuthMiddleware {
  public async validateBodyRequest(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.body && req.body.email && req.body.password) {
      next();
    } else {
      res.status(400).send({
        errors: ['Missing required fields: email and password'],
      });
    }
  }

  public async verifyUserPassword(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user: any = await usersService.getUserByEmailWithPassword(
      req.body.email
    );
    if (user) {
      const passwordHash = user.password;
      if (await argon2.verify(passwordHash, req.body.password)) {
        req.body = {
          userId: user.id,
          email: user.email,
          provider: 'email',
          permissionLevel: user.permissionLevel,
        };
        return next();
      } else {
        res.status(400).send({
          errors: ['Invalid email and/or password'],
        });
      }
    } else {
      res.status(400).send({ errors: ['Invalid email and/or password'] });
    }
  }
}

export default new AuthMiddleware();
