"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
var factoryType_1 = require("../database/factoryType");
var products_1 = require("./factory/products");
var ProductsController = /** @class */ (function () {
    function ProductsController() {
        var _this = this;
        this.getProducts = function (req, res) {
            return _this.factory.getProducts(req, res);
        };
        this.getProductById = function (req, res) {
            return _this.factory.getProductById(req, res);
        };
        this.addProduct = function (req, res) {
            return _this.factory.addProduct(req, res);
        };
        this.updateProductById = function (req, res) {
            return _this.factory.updateProductById(req, res);
        };
        this.deleteProductById = function (req, res) {
            return _this.factory.deleteProductById(req, res);
        };
        this.filter = function (req, res) {
            return _this.factory.filter(req, res);
        };
        /* Depending on the type of persistence selected in "/config/factoryType.ts" we will use
         * a particular database model or another */
        this.factory = products_1.FactoryProducts.type(factoryType_1.persistenceType);
    }
    return ProductsController;
}());
exports.ProductsController = ProductsController;
