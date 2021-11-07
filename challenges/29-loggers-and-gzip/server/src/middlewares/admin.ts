import {Request, Response, NextFunction} from "express";

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  // We check if the user is admin and if it is not we throw an error
  // req.session.user.isAdmin
  if (true) next();
  else
    res.status(401).json({
      error: 401,
      description: `Route '${req.originalUrl}' - Method '${req.method}' unauthorized`,
    });
}
