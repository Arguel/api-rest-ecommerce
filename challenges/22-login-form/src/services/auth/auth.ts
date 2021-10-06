import {Request, Response, NextFunction} from "express";

export function userProperties(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // We add to the request the user field with all its properties
  req.body.user = {
    login: true,
    isAdmin: true,
  };
  next();
}
