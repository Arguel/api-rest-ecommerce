"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysqlProducts = void 0;
var cart_products_1 = require("../../models/mysql/cart-products");
var mysql_db_1 = require("../../config/mysql.db");
var MysqlProducts = /** @class */ (function () {
    function MysqlProducts() {
        // MySQL connection
        (0, cart_products_1.connectMySQL)();
    }
    // Default error handler
    MysqlProducts.prototype.defaultError = function (err) {
        return {
            Error: "" + (err.message || "Unknown"),
            Status: "We are having problems connecting to the system, please try again later",
        };
    };
    // GET all Products (GET)
    MysqlProducts.prototype.getProducts = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var products, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, mysql_db_1.mysqlKnexInstance)("products").select("*")];
                    case 1:
                        products = _a.sent();
                        if (products.length === 0)
                            throw new Error("Product list is empty");
                        res.status(200).json(products);
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        res.status(500).json(this.defaultError(err_1));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // GET one Product (GET /:id)
    MysqlProducts.prototype.getProductById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var product, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, mysql_db_1.mysqlKnexInstance)("products").where("_id", req.params.id)];
                    case 1:
                        product = _a.sent();
                        if (product.length === 0)
                            throw new Error("The product is not added. You can add it by making an http POST request to domain/products");
                        res.status(200).json(product);
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        res.status(500).json(this.defaultError(err_2));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ADD a new Product (POST /:id)
    MysqlProducts.prototype.addProduct = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name_1, description, code, thumbnail, price, stock, newProduct, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, name_1 = _a.name, description = _a.description, code = _a.code, thumbnail = _a.thumbnail, price = _a.price, stock = _a.stock;
                        newProduct = {
                            name: name_1,
                            description: description,
                            code: Math.round(code),
                            thumbnail: thumbnail,
                            price: price.toFixed(2),
                            stock: Math.round(stock),
                        };
                        return [4 /*yield*/, (0, mysql_db_1.mysqlKnexInstance)("products").insert(newProduct)];
                    case 1:
                        _b.sent();
                        res.status(200).json({ Status: "Product saved" });
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _b.sent();
                        res.status(500).json(this.defaultError(err_3));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // UPDATE a Product (PUT /:id)
    MysqlProducts.prototype.updateProductById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name_2, description, code, thumbnail, price, stock, newProduct, result, err_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, name_2 = _a.name, description = _a.description, code = _a.code, thumbnail = _a.thumbnail, price = _a.price, stock = _a.stock;
                        newProduct = {
                            name: name_2,
                            description: description,
                            code: code,
                            thumbnail: thumbnail,
                            price: price,
                            stock: stock,
                        };
                        return [4 /*yield*/, (0, mysql_db_1.mysqlKnexInstance)("products")
                                .where({ _id: req.params.id })
                                .update(newProduct)];
                    case 1:
                        result = _b.sent();
                        if (result)
                            res.status(200).json({ Status: "Product updated" });
                        else
                            throw new Error("The product could not be updated / The product does not exist in the shopping cart");
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _b.sent();
                        res.status(500).json(this.defaultError(err_4));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // DELETE a Product (DELETE /:id)
    MysqlProducts.prototype.deleteProductById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var result, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, mysql_db_1.mysqlKnexInstance)("products")
                                .where({ _id: req.params.id })
                                .del()];
                    case 1:
                        result = _a.sent();
                        if (result)
                            res.status(200).json({ status: "Product Deleted" });
                        else
                            throw new Error("The product could not be found / The product does not exist in the shopping cart");
                        return [3 /*break*/, 3];
                    case 2:
                        err_5 = _a.sent();
                        res.status(500).json(this.defaultError(err_5));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Filter the products (POST)
    MysqlProducts.prototype.filter = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name_3, code_1, minPrice_1, maxPrice_1, minStock_1, maxStock_1, result, err_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, name_3 = _a.name, code_1 = _a.code, minPrice_1 = _a.minPrice, maxPrice_1 = _a.maxPrice, minStock_1 = _a.minStock, maxStock_1 = _a.maxStock;
                        return [4 /*yield*/, (0, mysql_db_1.mysqlKnexInstance)("products")
                                .modify(function (cxn) {
                                if (name_3)
                                    cxn.where({ name: name_3 });
                            })
                                .modify(function (cxn) {
                                if (code_1)
                                    cxn.where({ code: code_1 });
                            })
                                .modify(function (cxn) {
                                if (minPrice_1)
                                    cxn.where("price", ">=", minPrice_1);
                            })
                                .modify(function (cxn) {
                                if (maxPrice_1)
                                    cxn.where("price", "<=", maxPrice_1);
                            })
                                .modify(function (cxn) {
                                if (minStock_1)
                                    cxn.where("stock", ">=", minStock_1);
                            })
                                .modify(function (cxn) {
                                if (maxStock_1)
                                    cxn.where("stock", "<=", maxStock_1);
                            })];
                    case 1:
                        result = _b.sent();
                        if (result.length > 0)
                            res.status(200).json(result[0]);
                        else
                            throw new Error("No product matches this search/properties");
                        return [3 /*break*/, 3];
                    case 2:
                        err_6 = _b.sent();
                        res.status(500).json(this.defaultError(err_6));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return MysqlProducts;
}());
exports.MysqlProducts = MysqlProducts;
