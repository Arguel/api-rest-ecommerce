"use strict";
const __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
 return value instanceof P ? value : new P(function (resolve) {
 resolve(value);
});
}
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
 try {
 step(generator.next(value));
} catch (e) {
 reject(e);
}
}
        function rejected(value) {
 try {
 step(generator["throw"](value));
} catch (e) {
 reject(e);
}
}
        function step(result) {
 result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
}
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const __generator = (this && this.__generator) || function (thisArg, body) {
    let _ = {label: 0, sent: function() {
 if (t[0] & 1) throw t[1]; return t[1];
}, trys: [], ops: []}; let f; let y; let t; let g;
    return g = {"next": verb(0), "throw": verb(1), "return": verb(2)}, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
 return this;
}), g;
    function verb(n) {
 return function (v) {
 return step([n, v]);
};
}
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return {value: op[1], done: false};
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
 _ = 0; continue;
}
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
 _.label = op[1]; break;
}
                    if (op[0] === 6 && _.label < t[1]) {
 _.label = t[1]; t = op; break;
}
                    if (t && _.label < t[2]) {
 _.label = t[2]; _.ops.push(op); break;
}
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
 op = [6, e]; y = 0;
} finally {
 f = t = 0;
}
        if (op[0] & 5) throw op[1]; return {value: op[0] ? op[1] : void 0, done: true};
    }
};
Object.defineProperty(exports, "__esModule", {value: true});
exports.MysqlCart = void 0;
const cart_products_1 = require("../../models/mysql/cart-products");
const mysql_db_1 = require("../../database/mysql.db");
const cartId = "13";
const MysqlCart = /** @class */ (function () {
    function MysqlCart() {
        // MySQL connection
        (0, cart_products_1.connectMySQL)();
    }
    // Default error handler
    MysqlCart.prototype.defaultError = function (err) {
        return {
            name: "" + (err.name || "Unknown"),
            message: "" + (err.message || "Unknown"),
            status: "We are having problems connecting to the system, please try again later",
        };
    };
    // GET local cart
    MysqlCart.prototype.getLocalCart = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            let cart; let localCartId; let doc; let docCart;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cart = {
                            products: [],
                        };
                        localCartId = cartId;
                        if (!localCartId) return [3 /* break*/, 2];
                        return [4 /* yield*/, (0, mysql_db_1.mysqlKnexInstance)("carts").where("_id", cartId)];
                    case 1:
                        doc = _a.sent();
                        if (doc.length > 0) {
                            docCart = doc[0];
                            docCart.products = JSON.parse(docCart.products);
                            cart = docCart;
                        }
                        _a.label = 2;
                    case 2: return [2 /* return*/, cart];
                }
            });
        });
    };
    // GET current cart (GET)
    MysqlCart.prototype.getCart = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            let cart; let err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /* yield*/, this.getLocalCart(req)];
                    case 1:
                        cart = _a.sent();
                        if (cart.products.length === 0)
                            throw new Error("The shopping cart is empty");
                        res.status(200).json(cart);
                        return [3 /* break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        res.status(500).json(this.defaultError(err_1));
                        return [3 /* break*/, 3];
                    case 3: return [2];
                }
            });
        });
    };
    // GET one Product (GET /:id)
    MysqlCart.prototype.getCartProductById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            let cart; let product; let productInCart; let err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /* yield*/, this.getLocalCart(req)];
                    case 1:
                        cart = _a.sent();
                        product = {};
                        productInCart = cart.products.find(function (elem) {
 return elem._id === parseInt(req.params.id);
});
                        if (productInCart)
                            product = productInCart;
                        else
                            throw new Error("The cart does not have this product added. You can add it by making an http POST request to domain/cart/" + req.params.id);
                        res.status(200).json(product);
                        return [3 /* break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        res.status(500).json(this.defaultError(err_2));
                        return [3 /* break*/, 3];
                    case 3: return [2];
                }
            });
        });
    };
    // ADD a new Product (POST /:id)
    MysqlCart.prototype.addProduct = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            let cart; let result; let itemIndex; let products; let _a; let _id_1; let timestamp; let name_1; let description; let code; let thumbnail; let price; let stock; let newProductInCart; let err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 9, , 10]);
                        return [4 /* yield*/, this.getLocalCart(req)];
                    case 1:
                        cart = _b.sent();
                        result = false;
                        itemIndex = -1;
                        return [4 /* yield*/, (0, mysql_db_1.mysqlKnexInstance)("products").where("_id", req.params.id)];
                    case 2:
                        products = _b.sent();
                        // In case the product does not exist in the product database
                        if (products.length === 0)
                            throw new Error("No product with that id was found");
                        _a = products[0], _id_1 = _a._id, timestamp = _a.timestamp, name_1 = _a.name, description = _a.description, code = _a.code, thumbnail = _a.thumbnail, price = _a.price, stock = _a.stock;
                        // We check if it is already added to the shopping cart
                        if (cart.products.length > 0)
                            itemIndex = cart.products.findIndex(function (obj) {
 return obj._id === _id_1;
});
                        if (!(itemIndex !== -1)) return [3 /* break*/, 4];
                        cart.products[itemIndex].quantityOnCart++;
                        return [4 /* yield*/, (0, mysql_db_1.mysqlKnexInstance)("carts")
                                .where({_id: cartId})
                                .update({products: JSON.stringify(cart.products)})];
                    case 3:
                        result = _b.sent();
                        return [3 /* break*/, 8];
                    case 4:
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
                        if (!cart._id) return [3 /* break*/, 6];
                        return [4 /* yield*/, (0, mysql_db_1.mysqlKnexInstance)("carts")
                                .where({_id: cartId})
                                .update({
                                products: JSON.stringify(cart.products),
                            })];
                    case 5:
                        result = _b.sent();
                        return [3 /* break*/, 8];
                    case 6: return [4 /* yield*/, (0, mysql_db_1.mysqlKnexInstance)("carts").insert({
                            products: JSON.stringify(cart.products),
                        })];
                    case 7:
                        result = _b.sent();
                        _b.label = 8;
                    case 8:
                        // cartId = updatedCart._id;
                        if (result)
                            res.status(200).json({Status: "Product saved/updated"});
                        else
                            throw new Error("The product could not be added / updated, check that the information matches the schema");
                        return [3 /* break*/, 10];
                    case 9:
                        err_3 = _b.sent();
                        res.status(500).json(this.defaultError(err_3));
                        return [3 /* break*/, 10];
                    case 10: return [2];
                }
            });
        });
    };
    // DELETE a Product (DELETE /:id)
    MysqlCart.prototype.deleteProductById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            let cart; let itemIndex; let err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /* yield*/, this.getLocalCart(req)];
                    case 1:
                        cart = _a.sent();
                        itemIndex = cart.products.findIndex(function (obj) {
 return obj._id === parseInt(req.params.id);
});
                        if (!(itemIndex !== -1)) return [3 /* break*/, 3];
                        cart.products.splice(itemIndex, 1);
                        return [4 /* yield*/, (0, mysql_db_1.mysqlKnexInstance)("carts")
                                .where({_id: cartId})
                                .update({products: JSON.stringify(cart.products)})];
                    case 2:
                        _a.sent();
                        res.status(200).json({status: "Product Deleted"});
                        return [3 /* break*/, 4];
                    case 3: throw new Error("Product not found");
                    case 4: return [3 /* break*/, 6];
                    case 5:
                        err_4 = _a.sent();
                        res.status(500).json(this.defaultError(err_4));
                        return [3 /* break*/, 6];
                    case 6: return [2];
                }
            });
        });
    };
    return MysqlCart;
}());
exports.MysqlCart = MysqlCart;
