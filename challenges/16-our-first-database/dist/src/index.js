"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./services/server");
const config_1 = __importDefault(require("./config"));
const socket_1 = require("./services/socket");
const Mysql_1 = require("./services/Mysql");
const sqlite3_1 = require("./services/sqlite3");
server_1.httpServer.listen(config_1.default.server_port, () => {
    console.log(`Server running on port:${config_1.default.server_port}`);
    socket_1.ioService.init(server_1.httpServer);
    Mysql_1.mysql_service.init();
    sqlite3_1.sqLite_service.init();
});
//# sourceMappingURL=index.js.map