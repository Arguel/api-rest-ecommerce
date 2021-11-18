import {Request, Response, NextFunction} from "express";

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.isAuthenticated()) next();
  else res.redirect(308, "/api/auth/login");
  // else res.send("First you need to log into your account");
}
