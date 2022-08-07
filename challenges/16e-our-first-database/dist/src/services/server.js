"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpServer = exports.hbs = exports.app = void 0;
const errorHandler_1 = require("../middleware/errorHandler");
const express_handlebars_1 = require("express-handlebars");
const index_1 = __importDefault(require("../routes/index"));
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
exports.app = express_1.default();
exports.hbs = express_handlebars_1.create({
    extname: "hbs",
    layoutsDir: path_1.default.resolve(__dirname, "../../views/layouts"),
    defaultLayout: path_1.default.resolve(__dirname, "../../views/layouts/main"),
    partialsDir: path_1.default.resolve(__dirname, "../../views/partial"),
});
exports.app.engine("hbs", exports.hbs.engine);
exports.app.set("view engine", "hbs");
exports.app.set("views", path_1.default.resolve(__dirname, "../../views"));
const publicFolderPath = path_1.default.resolve(__dirname, "../../public");
exports.app.use(express_1.default.static(publicFolderPath));
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use("/api", index_1.default);
exports.app.use(errorHandler_1.notFound);
exports.app.use(errorHandler_1.errorHandler);
exports.httpServer = new http_1.Server(exports.app);
//# sourceMappingURL=server.js.map