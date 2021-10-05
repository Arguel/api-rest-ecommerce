import express from "express";

function userProperties(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  // We add to the request the user field with all its properties
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
  // We check if the user is admin and if it is not we throw an error
  if (user.isAdmin) next();
  else
    res.status(401).json({
      error: 401,
      description: `Route '${req.originalUrl}' - Method '${req.method}' unauthorized`,
    });
}

export {userProperties, isAdmin};
