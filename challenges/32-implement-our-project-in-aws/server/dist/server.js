"use strict";
const __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {enumerable: true, get: function() {
 return m[k];
}});
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
const __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", {enumerable: true, value: v});
}) : function(o, v) {
    o["default"] = v;
});
const __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    const result = {};
    if (mod != null) for (const k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
const __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : {"default": mod};
};
Object.defineProperty(exports, "__esModule", {value: true});
const http = __importStar(require("http"));
const socket_io_1 = require("socket.io");
const socket_io_2 = require("./services/socket.io");
const debug_1 = __importDefault(require("debug"));
const os_1 = __importDefault(require("os"));
const cluster_1 = __importDefault(require("cluster"));
const path_1 = __importDefault(require("path"));
// For the "config" module to correctly detect our configuration folder ("config/")
process.env["NODE_CONFIG_DIR"] = path_1.default.join(__dirname, "/config/");
const config_1 = __importDefault(require("config"));
const app_1 = require("./app");
const _a = config_1.default.default.app; const host = _a.host; const appPort = _a.port; const startMode = _a.startMode; const initiator = _a.initiator; const startMsg = _a.startMsg;
(0, debug_1.default)("http");
const numCPUs = os_1.default.cpus().length;
// Port
const port = normalizePort(appPort);
app_1.app.set("port", port);
// Main application
const httpServer = http.createServer(app_1.app);
if (startMode === "cluster" && initiator !== "pm2" && cluster_1.default.isPrimary) {
    for (let i = 0; i < numCPUs; i++)
        cluster_1.default.fork();
    cluster_1.default.on("exit", function (worker, code, signal) {
        console.log("worker " + worker.process.pid + " died, code - " + code + ", signal - " + signal);
    });
} else {
    // Starting the server
    httpServer.listen(port);
    httpServer.on("error", onError);
    httpServer.on("listening", onListening);
    console.log("Worker " + process.pid + " started");
}
// Websockets
const io = new socket_io_1.Server(httpServer, {
/* options */
});
// Io socket connection
(0, socket_io_2.socketIo)(io);
function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port))
        return val;
    if (port >= 0)
        return port;
    return false;
}
function onError(error) {
    if (error.syscall !== "listen")
        throw error;
    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
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
    const addr = httpServer.address();
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    (0, debug_1.default)("Listening on " + bind);
    const url = "http://" + host + ":" + httpServer.address().port;
    const message = startMsg.replace(/\{0}/g, url);
    console.log(message);
    console.log("Optional launch parameters (the application already has default values): {\n\n  node server/dist/server.js {PORT - 2} {FACEBOOK_CLIENT_ID - 3} {FACEBOOK_CLIENT_SECRET - 4} {START_MODE (FORK/CLUSTER) - 5} {INITIATOR (FOREVER/PM2) - 6}\n\n  Example: node server/dist/server.js 8080 39402342342 3bsj32n2bs352 \n}");
}
process.on("exit", function (code) {
    console.log("About to exit with code: " + code);
});
