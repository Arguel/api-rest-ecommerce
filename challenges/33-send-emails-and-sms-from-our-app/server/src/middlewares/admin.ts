import {Request, Response, NextFunction} from "express";

interface IUser extends Express.User {
  isAdmin: boolean;
}

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  // We check if the user is admin and if it is not we throw an error
  // req.session.user.isAdmin
  if (req.user && (req.user as IUser).isAdmin) next();
  else
    res.status(401).json({
      error: 401,
      description: `Route '${req.originalUrl}' - Method '${req.method}' unauthorized`,
    });
}
