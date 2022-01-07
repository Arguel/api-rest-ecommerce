import {Application, Request, Response, NextFunction} from "express";
import {IRequestError} from "../libs/interfaces/errors.interfaces";

const defaultError = (app: Application) => {
  // Catch 404 and forward to error handler
  app.use(function (req: Request, res: Response, next: NextFunction) {
    const err: IRequestError = new Error("Not Found");
    err.status = 404;
    next(err);
  });

  // Development error handler (will print stacktrace)
  if (app.get("env") === "development")
    app.use(function (
      err: IRequestError,
      req: Request,
      res: Response,
      next: NextFunction,
    ) {
      res.status((err.status as number) || 500).send({
        message: err.message,
        error: err,
      });
    });

  // Production error handler (no stacktraces leaked to user)
  app.use(function (
    err: IRequestError,
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    res.status((err.status as number) || 500).send({
      message: err.message,
      error: {},
    });
  });
};

export default defaultError;
