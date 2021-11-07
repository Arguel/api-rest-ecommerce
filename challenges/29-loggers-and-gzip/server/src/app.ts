import express from "express";
import mainConfig from "./config/app/main.config";
import routeConfig from "./config/app/route.config";
import errorConfig from "./config/app/error.config";
import loggerConfig from "./config/app/logger.config";

// Main application
const app: express.Application = express();

// Config
mainConfig(app);
loggerConfig(app);
routeConfig(app);
errorConfig(app);

export {app};
