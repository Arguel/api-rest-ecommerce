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
var express_1 = __importDefault(require("express"));
var http = __importStar(require("http"));
var socket_io_1 = require("socket.io");
var morgan_1 = __importDefault(require("morgan"));
var path_1 = __importDefault(require("path"));
var products_routes_1 = __importDefault(require("./routes/products.routes"));
var cart_routes_1 = __importDefault(require("./routes/cart.routes"));
var views_routes_1 = __importDefault(require("./routes/views.routes"));
var not_found_routes_1 = __importDefault(require("./routes/not-found.routes"));
var dotenv_1 = __importDefault(require("dotenv"));
var socket_io_2 = require("./services/socket.io");
var express_session_1 = __importDefault(require("express-session"));
var connect_mongo_1 = __importDefault(require("connect-mongo"));
var mongodb_db_1 = require("./config/mongodb.db");
var passport_1 = __importDefault(require("passport"));
// Environment Variables
dotenv_1.default.config();
// Port
var port = parseInt(process.env.PORT) || 8080;
// Main application
var app = (0, express_1.default)();
var httpServer = http.createServer(app);
// Websockets
var io = new socket_io_1.Server(httpServer, {
/* options */
});
// Middlewares
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use((0, express_session_1.default)({
    store: connect_mongo_1.default.create({
        mongoUrl: process.env.MONGO_URI,
        mongoOptions: mongodb_db_1.mongoOptions,
    }),
    secret: "my_secret",
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 120 * 1000,
        httpOnly: false,
        secure: false,
    },
    rolling: true,
}));
// Static files
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
// Routes
app.use("/products", products_routes_1.default);
app.use("/cart", cart_routes_1.default);
app.use("/", views_routes_1.default);
// This manages the non-existent routes
app.use("*", not_found_routes_1.default);
// Io socket connection
(0, socket_io_2.socketIo)(io);
// Starting the server
httpServer.listen(port, function () {
    console.log("Example app listening at http://localhost:" + port);
});
