"use strict";
const __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : {"default": mod};
};
Object.defineProperty(exports, "__esModule", {value: true});
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const main_config_1 = __importDefault(require("./app/main.config"));
const route_config_1 = __importDefault(require("./app/route.config"));
const error_config_1 = __importDefault(require("./app/error.config"));
const logger_config_1 = __importDefault(require("./app/logger.config"));
// Main application
const app = (0, express_1.default)();
exports.app = app;
// Config
(0, main_config_1.default)(app);
(0, logger_config_1.default)(app);
(0, route_config_1.default)(app);
(0, error_config_1.default)(app);
