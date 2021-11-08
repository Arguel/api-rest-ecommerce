import {Application} from "express";
import * as winston from "winston";
import * as expressWinston from "express-winston";

const defaultLogger = (app: Application) => {
  const loggerOptions: expressWinston.LoggerOptions = {
    transports: [
      new winston.transports.Console({level: "verbose"}),
      new winston.transports.File({filename: "warn.log", level: "warn"}),
      new winston.transports.File({filename: "error.log", level: "error"}),
    ],
    format: winston.format.combine(
      winston.format.json(),
      winston.format.prettyPrint(),
      winston.format.colorize({all: true}),
    ),
  };

  if (!process.env.DEBUG) loggerOptions.meta = false;

  app.use(expressWinston.logger(loggerOptions));
};

export default defaultLogger;
