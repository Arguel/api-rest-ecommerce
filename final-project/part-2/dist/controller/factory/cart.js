"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactoryCart = void 0;
var cart_1 = require("../mongodb/cart");
var FactoryCart = /** @class */ (function () {
    function FactoryCart() {
    }
    FactoryCart.prototype.type = function (type) {
        switch (type) {
            case "mongodb":
                return new cart_1.MongodbCart();
            case "mysql":
                return new MysqlProducts();
            default:
                return new cart_1.MongodbCart();
        }
    };
    return FactoryCart;
}());
exports.FactoryCart = FactoryCart;
