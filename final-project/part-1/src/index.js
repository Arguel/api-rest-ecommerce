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
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const products_routes_1 = __importDefault(require("./routes/products.routes"));
const cart_routes_1 = __importDefault(require("./routes/cart.routes"));
require("./database");
const auth_1 = require("./middlewares/auth");
const app = (0, express_1.default)();
const server = http.createServer(app);
// Settings
app.set("port", process.env.PORT || 8080);
// Middlewares
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
// Routes
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});
app.use("/products", auth_1.userProperties, products_routes_1.default);
app.use("/cart", cart_routes_1.default);
app.get("*", function (req, res) {
    res.status(404).json({
        error: 404,
        description: "Route '" + req.originalUrl + "' - Method '" + req.method + "' not found",
    });
});
// Static files
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
// Starting the server
server.listen(app.get("port"), function () {
    console.log("Example app listening at http://localhost:" + app.get("port"));
});
