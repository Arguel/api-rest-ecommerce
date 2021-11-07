"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var main_config_1 = __importDefault(require("./config/app/main.config"));
var route_config_1 = __importDefault(require("./config/app/route.config"));
var error_config_1 = __importDefault(require("./config/app/error.config"));
// Main application
var app = (0, express_1.default)();
exports.app = app;
// Config
(0, main_config_1.default)(app);
(0, route_config_1.default)(app);
(0, error_config_1.default)(app);
