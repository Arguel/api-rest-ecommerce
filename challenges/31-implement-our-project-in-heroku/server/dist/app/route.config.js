"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var products_routes_1 = __importDefault(require("../routes/products.routes"));
var cart_routes_1 = __importDefault(require("../routes/cart.routes"));
var views_routes_1 = __importDefault(require("../routes/views.routes"));
var not_found_routes_1 = __importDefault(require("../routes/not-found.routes"));
var defaultRoute = function (app) {
    // Routes
    app.use("/products", products_routes_1.default);
    app.use("/cart", cart_routes_1.default);
    app.use("/", views_routes_1.default);
    // This manages the non-existent routes
    app.use("*", not_found_routes_1.default);
};
exports.default = defaultRoute;
