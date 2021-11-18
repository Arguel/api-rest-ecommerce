"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var winston = __importStar(require("winston"));
var expressWinston = __importStar(require("express-winston"));
var defaultLogger = function (app) {
    var loggerOptions = {
        transports: [
            new winston.transports.Console({ level: "verbose" }),
            new winston.transports.File({ filename: "warn.log", level: "warn" }),
            new winston.transports.File({ filename: "error.log", level: "error" }),
        ],
        format: winston.format.combine(winston.format.json(), winston.format.prettyPrint(), winston.format.colorize({ all: true })),
    };
    if (!process.env.DEBUG)
        loggerOptions.meta = false;
    app.use(expressWinston.logger(loggerOptions));
};
exports.default = defaultLogger;
