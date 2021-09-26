"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
var factoryType_1 = require("../config/factoryType");
var cart_1 = require("./factory/cart");
// Main switch/selector for persistence types
var factory = new cart_1.FactoryCart();
var CartController = /** @class */ (function () {
    function CartController() {
        this.factory = factory.type(factoryType_1.persistenceType);
    }
    CartController.prototype.getCart = function (req, res) {
        return this.factory.getCart(req, res);
    };
    CartController.prototype.getCartProduct = function (req, res) {
        return this.factory.getCartProduct(req, res);
    };
    CartController.prototype.addProduct = function (req, res) {
        return this.factory.addProduct(req, res);
    };
    CartController.prototype.deleteProductById = function (req, res) {
        return this.factory.deleteProductById(req, res);
    };
    return CartController;
}());
exports.CartController = CartController;
