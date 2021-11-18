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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http = __importStar(require("http"));
var socket_io_1 = require("socket.io");
var socket_io_2 = require("./services/socket.io");
var debug_1 = __importDefault(require("debug"));
var os_1 = __importDefault(require("os"));
var cluster_1 = __importDefault(require("cluster"));
var path_1 = __importDefault(require("path"));
// For the "config" module to correctly detect our configuration folder ("config/")
process.env["NODE_CONFIG_DIR"] = path_1.default.join(__dirname, "/config/");
var config_1 = __importDefault(require("config"));
var app_1 = require("./app");
var _a = config_1.default.default.app, host = _a.host, appPort = _a.port, startMode = _a.startMode, initiator = _a.initiator, startMsg = _a.startMsg;
(0, debug_1.default)("http");
var numCPUs = os_1.default.cpus().length;
// Port
var port = normalizePort(appPort);
app_1.app.set("port", port);
// Main application
var httpServer = http.createServer(app_1.app);
if (startMode === "cluster" && initiator !== "pm2" && cluster_1.default.isPrimary) {
    for (var i = 0; i < numCPUs; i++)
        cluster_1.default.fork();
    cluster_1.default.on("exit", function (worker, code, signal) {
        console.log("worker " + worker.process.pid + " died, code - " + code + ", signal - " + signal);
    });
}
else {
    // Starting the server
    httpServer.listen(port);
    httpServer.on("error", onError);
    httpServer.on("listening", onListening);
    console.log("Worker " + process.pid + " started");
}
// Websockets
var io = new socket_io_1.Server(httpServer, {
/* options */
});
// Io socket connection
(0, socket_io_2.socketIo)(io);
function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port))
        return val;
    if (port >= 0)
        return port;
    return false;
}
function onError(error) {
    if (error.syscall !== "listen")
        throw error;
    var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
        default:
            throw error;
    }
}
function onListening() {
    var addr = httpServer.address();
    var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    (0, debug_1.default)("Listening on " + bind);
    var url = "http://" + host + ":" + httpServer.address().port + "/api/";
    var message = startMsg.replace(/\{0}/g, url);
    console.log(message);
    console.log("Optional launch parameters (the application already has default values): {\n\n  node server/dist/server.js {PORT - 2} {FACEBOOK_CLIENT_ID - 3} {FACEBOOK_CLIENT_SECRET - 4} {START_MODE (FORK/CLUSTER) - 5} {INITIATOR (FOREVER/PM2) - 6}\n\n  Example: node server/dist/server.js 8080 39402342342 3bsj32n2bs352 \n}");
}
process.on("exit", function (code) {
    console.log("About to exit with code: " + code);
});
