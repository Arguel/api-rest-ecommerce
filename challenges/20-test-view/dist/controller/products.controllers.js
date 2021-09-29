"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
exports.ProductsController = void 0;
const factoryType_1 = require("../config/factoryType");
const products_1 = require("./factory/products");
// Main switch/selector for persistence types
const factory = new products_1.FactoryProducts();
const ProductsController = /** @class */ (function () {
    function ProductsController() {
        /* Depending on the type of persistence selected in "/config/factoryType.ts" we will use
         * a particular database model or another */
        this.factory = factory.type(factoryType_1.persistenceType);
    }
    ProductsController.prototype.getProducts = function (req, res) {
        return this.factory.getProducts(req, res);
    };
    ProductsController.prototype.getProductById = function (req, res) {
        return this.factory.getProductById(req, res);
    };
    ProductsController.prototype.addProduct = function (req, res) {
        return this.factory.addProduct(req, res);
    };
    ProductsController.prototype.updateProductById = function (req, res) {
        return this.factory.updateProductById(req, res);
    };
    ProductsController.prototype.deleteProductById = function (req, res) {
        return this.factory.deleteProductById(req, res);
    };
    ProductsController.prototype.filter = function (req, res) {
        return this.factory.filter(req, res);
    };
    return ProductsController;
}());
exports.ProductsController = ProductsController;
