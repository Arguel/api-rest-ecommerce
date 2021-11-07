import express from "express";
import appConfig from "./config/app/main.config";
import routeConfig from "./config/app/route.config";
import errorConfig from "./config/app/error.config";

// Main application
const app: express.Application = express();

// Config
appConfig(app);
routeConfig(app);
errorConfig(app);

export {app};
