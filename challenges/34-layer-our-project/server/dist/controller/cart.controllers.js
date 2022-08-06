"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
var factoryType_1 = require("../database/factoryType");
var cart_1 = require("./factory/cart");
var CartController = /** @class */ (function () {
    function CartController() {
        var _this = this;
        this.getCart = function (req, res) {
            return _this.factory.getCart(req, res);
        };
        this.getCartProductById = function (req, res) {
            return _this.factory.getCartProductById(req, res);
        };
        this.addProduct = function (req, res) {
            return _this.factory.addProduct(req, res);
        };
        this.deleteProductById = function (req, res) {
            return _this.factory.deleteProductById(req, res);
        };
        /* Depending on the type of persistence selected in "/config/factoryType.ts" we will use
         * a particular database model or another */
        this.factory = cart_1.FactoryCart.type(factoryType_1.persistenceType);
    }
    return CartController;
}());
exports.CartController = CartController;
