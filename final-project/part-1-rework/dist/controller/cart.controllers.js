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
exports.CartController = void 0;
var products_1 = require("../models/products");
var cart_1 = require("../models/cart");
var CartController = /** @class */ (function () {
    function CartController() {
    }
    // Default error handler
    CartController.prototype.defaultError = function (err) {
        return {
            Error: "" + (err.message || "Unknown"),
            Status: "We are having problems connecting to the system, please try again later",
        };
    };
    // GET local cart
    CartController.prototype.getLocalCart = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cart, localCartId, doc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cart = {
                            products: [],
                            timestamp: new Date().toString(),
                        };
                        localCartId = localStorage.getItem("cartId");
                        if (!localCartId) return [3 /*break*/, 2];
                        return [4 /*yield*/, cart_1.CartModel.findById(localCartId)];
                    case 1:
                        doc = _a.sent();
                        if (doc)
                            cart = doc;
                        _a.label = 2;
                    case 2: return [2 /*return*/, cart];
                }
            });
        });
    };
    // GET current cart
    CartController.prototype.getCart = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var cart, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getLocalCart()];
                    case 1:
                        cart = _a.sent();
                        res.status(200).json(cart);
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
    // GET one Product
    CartController.prototype.getCartProduct = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var cart, product, productInCart, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getLocalCart()];
                    case 1:
                        cart = _a.sent();
                        product = {};
                        if (cart.products.length > 1) {
                            productInCart = cart.products.find(function (elem) { return elem._id === req.params.id; });
                            if (productInCart)
                                product = productInCart;
                        }
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
    // ADD a new Product
    CartController.prototype.addProduct = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var cart, _a, _id_1, timestamp, name_1, description, code, thumbnail, price, stock, itemIndex, newProductInCart, updatedCart, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.getLocalCart()];
                    case 1:
                        cart = _b.sent();
                        return [4 /*yield*/, products_1.ProductModel.findById(req.params.id)];
                    case 2:
                        _a = (_b.sent()), _id_1 = _a._id, timestamp = _a.timestamp, name_1 = _a.name, description = _a.description, code = _a.code, thumbnail = _a.thumbnail, price = _a.price, stock = _a.stock;
                        itemIndex = cart.products.findIndex(function (obj) { return obj._id === _id_1; });
                        if (itemIndex !== -1) {
                            cart.products[itemIndex].quantityOnCart++;
                        }
                        else {
                            newProductInCart = {
                                _id: _id_1,
                                timestamp: timestamp,
                                name: name_1,
                                description: description,
                                code: code,
                                thumbnail: thumbnail,
                                price: price,
                                stock: stock,
                                quantityOnCart: 1,
                            };
                            cart.products.push(newProductInCart);
                        }
                        updatedCart = new cart_1.CartModel(cart);
                        updatedCart.save(function (err, room) {
                            localStorage.setItem("cartId", room._id);
                            res.status(200).json({ Status: "Product saved" });
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _b.sent();
                        res.status(500).json(this.defaultError(err_3));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // DELETE a Product
    CartController.prototype.deleteProductById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var cart, itemIndex, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getLocalCart()];
                    case 1:
                        cart = _a.sent();
                        itemIndex = cart.products.findIndex(function (obj) { return obj._id === req.params.id; });
                        if (itemIndex !== -1) {
                            cart.products.splice(itemIndex, 1);
                            res.status(200).json({ status: "Product Deleted" });
                        }
                        else {
                            throw new Error("Product not found");
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _a.sent();
                        res.status(500).json(this.defaultError(err_4));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return CartController;
}());
exports.CartController = CartController;
// asd
