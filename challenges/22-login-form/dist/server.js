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
const express_1 = __importDefault(require("express"));
const http = __importStar(require("http"));
const socket_io_1 = require("socket.io");
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const products_routes_1 = __importDefault(require("./routes/products.routes"));
const cart_routes_1 = __importDefault(require("./routes/cart.routes"));
const not_found_routes_1 = __importDefault(require("./routes/not-found.routes"));
const auth_1 = require("./middlewares/auth");
const dotenv_1 = __importDefault(require("dotenv"));
const socket_io_2 = require("./sockets/socket.io");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
// Environment Variables
dotenv_1.default.config();
// Port
const port = parseInt(process.env.PORT) || 8080;
// Main application
const app = (0, express_1.default)();
const httpServer = http.createServer(app);
// Websockets
const io = new socket_io_1.Server(httpServer, {
/* options */
});
// Middlewares
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)({
    secret: "secreto",
    resave: true,
    saveUninitialized: true,
}));
// Static files
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
// Routes
app.get("/", function (req, res) {
    res.sendFile(path_1.default.join(__dirname, "/public/index.html"));
});
app.use("/products", auth_1.userProperties, products_routes_1.default);
app.use("/cart", cart_routes_1.default);
// This manages the non-existent routes
app.use("*", not_found_routes_1.default);
// Io socket connection
(0, socket_io_2.socketIo)(io);
// Starting the server
httpServer.listen(port, function () {
    console.log("Example app listening at http://localhost:" + port);
});
