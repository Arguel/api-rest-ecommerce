import express from "express";

function userProperties(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  req.body.user = {
    login: true,
    isAdmin: true,
  };
  next();
}

function isAdmin(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const user = req.body.user;
  if (user.isAdmin) next();
  else
    res.status(401).json({
      error: 401,
      description: `route '${req.path}' method '${req.method}' unauthorized`,
    });
}

export {userProperties, isAdmin};
