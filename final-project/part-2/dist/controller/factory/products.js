"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactoryProducts = void 0;
var products_1 = require("../mongodb/products");
var FactoryProducts = /** @class */ (function () {
    function FactoryProducts() {
    }
    FactoryProducts.prototype.type = function (type) {
        switch (type) {
            case "mongodb":
                return new products_1.MongodbProducts();
            case "mysql":
                return new MysqlProducts();
            default:
                return new products_1.MongodbProducts();
        }
    };
    return FactoryProducts;
}());
exports.FactoryProducts = FactoryProducts;
