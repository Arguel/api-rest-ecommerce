"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ioService = void 0;
const socket_io_1 = __importDefault(require("socket.io"));
const messages_1 = require("../controllers/messages");
const products_1 = require("../controllers/products");
class IoService {
    constructor() {
        this.init = (httpServer) => {
            console.log("Iniciando conexión socket");
            if (this.ioServer) {
                console.log("Una conexión socket ya se encuentra establecida.");
            }
            else {
                this.ioServer = new socket_io_1.default.Server(httpServer);
                this.ioServer.on("connection", async (socket) => {
                    socket.emit("mensajes", await messages_1.messagesController.getAll());
                    socket.on("new-msg", async (data) => {
                        var _a;
                        await messages_1.messagesController.save(data);
                        (_a = this.ioServer) === null || _a === void 0 ? void 0 : _a.emit("mensajes", await messages_1.messagesController.getAll());
                    });
                    socket.emit("product-list", await products_1.productController.getAll());
                    socket.on("new_product", async (data) => {
                        var _a;
                        await products_1.productController.save(data);
                        (_a = this.ioServer) === null || _a === void 0 ? void 0 : _a.emit("product-list", await products_1.productController.getAll());
                    });
                });
            }
        };
    }
}
exports.ioService = new IoService();
//# sourceMappingURL=socket.js.map