"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactoryCart = void 0;
var cart_1 = require("../mongodb/cart");
var cart_2 = require("../mysql/cart");
var FactoryCart = /** @class */ (function () {
    function FactoryCart() {
    }
    // The type() method returns our DAO (data access object)
    FactoryCart.prototype.type = function (type) {
        switch (type) {
            case "mongodb":
                return new cart_1.MongodbCart();
            case "mysql":
                return new cart_2.MysqlCart();
            default:
                return new cart_1.MongodbCart();
        }
    };
    return FactoryCart;
}());
exports.FactoryCart = FactoryCart;
