import express from "express";
import mainConfig from "./app/main.config";
import routeConfig from "./app/route.config";
import errorConfig from "./app/error.config";
import loggerConfig from "./app/logger.config";

// Main application
const app: express.Application = express();

// Config
mainConfig(app);
loggerConfig(app);
routeConfig(app);
errorConfig(app);

export {app};
