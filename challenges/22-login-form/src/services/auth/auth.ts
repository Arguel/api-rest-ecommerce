import {Request, Response, NextFunction} from "express";

export function auth(req: Request, res: Response, next: NextFunction) {
  if (req.session.user) next();
  // else res.redirect(308, "/login");
  else res.send("First you need to log into your account");
}
