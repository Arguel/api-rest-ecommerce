"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var path_1 = __importDefault(require("path"));
var products_routes_1 = __importDefault(require("./routes/products.routes"));
var cart_routes_1 = __importDefault(require("./routes/cart.routes"));
var auth_1 = require("./middlewares/auth");
var db_1 = require("./config/db");
// MongoDB connection
(0, db_1.connectDB)();
// Main application
var app = (0, express_1.default)();
// Settings
app.set("port", process.env.PORT || 8080);
// Middlewares
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
// Routes
app.get("/", function (req, res) {
    res.sendFile(path_1.default.join(__dirname, "/public/index.html"));
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
app.listen(app.get("port"), function () {
    console.log("Example app listening at http://localhost:" + app.get("port"));
});
