"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (const p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.MongodbProducts = void 0;
const products_1 = require("../../models/mongodb/products");
const mongodb_db_1 = require("../../config/mongodb.db");
const MongodbProducts = /** @class */ (function () {
    function MongodbProducts() {
        // MongoDB connection
        (0, mongodb_db_1.connectMongoDB)();
    }
    // Default error handler
    MongodbProducts.prototype.defaultError = function (err) {
        return {
            Error: "" + (err.message || "Unknown"),
            Status: "We are having problems connecting to the system, please try again later",
        };
    };
    // GET all Products (GET)
    MongodbProducts.prototype.getProducts = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            let products; let err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /* yield*/, products_1.ProductModel.find()];
                    case 1:
                        products = _a.sent();
                        res.status(200).json(products);
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
    MongodbProducts.prototype.getProductById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            let product; let err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /* yield*/, products_1.ProductModel.findById(req.params.id)];
                    case 1:
                        product = (_a.sent());
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
    MongodbProducts.prototype.addProduct = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            let _a; let name_1; let description; let code; let thumbnail; let price; let stock; let newProduct; let err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, name_1 = _a.name, description = _a.description, code = _a.code, thumbnail = _a.thumbnail, price = _a.price, stock = _a.stock;
                        newProduct = new products_1.ProductModel({
                            timestamp: new Date().toString(),
                            name: name_1,
                            description: description,
                            code: Math.round(code),
                            thumbnail: thumbnail,
                            price: price.toFixed(2),
                            stock: Math.round(stock),
                        });
                        return [4 /* yield*/, newProduct.save()];
                    case 1:
                        _b.sent();
                        res.status(200).json({Status: "Product saved"});
                        return [3 /* break*/, 3];
                    case 2:
                        err_3 = _b.sent();
                        res.status(500).json(this.defaultError(err_3));
                        return [3 /* break*/, 3];
                    case 3: return [2];
                }
            });
        });
    };
    // UPDATE a Product (PUT /:id)
    MongodbProducts.prototype.updateProductById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            let _a; let name_2; let description; let code; let thumbnail; let price; let stock; let newProduct; let err_4;
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
                        // We update the product if it exists
                        return [4 /* yield*/, products_1.ProductModel.findByIdAndUpdate(req.params.id, newProduct)];
                    case 1:
                        // We update the product if it exists
                        _b.sent();
                        res.status(200).json({Status: "Product updated"});
                        return [3 /* break*/, 3];
                    case 2:
                        err_4 = _b.sent();
                        res.status(500).json(this.defaultError(err_4));
                        return [3 /* break*/, 3];
                    case 3: return [2];
                }
            });
        });
    };
    // DELETE a Product (DELETE /:id)
    MongodbProducts.prototype.deleteProductById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            let err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        // We delete the product from the database
                        return [4 /* yield*/, products_1.ProductModel.findByIdAndRemove(req.params.id)];
                    case 1:
                        // We delete the product from the database
                        _a.sent();
                        res.status(200).json({status: "Product Deleted"});
                        return [3 /* break*/, 3];
                    case 2:
                        err_5 = _a.sent();
                        res.status(500).json(this.defaultError(err_5));
                        return [3 /* break*/, 3];
                    case 3: return [2];
                }
            });
        });
    };
    // Filter the products (POST)
    MongodbProducts.prototype.filter = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            let _a; let name_3; let code; let minPrice; let maxPrice; let minStock; let maxStock; let filters; let product; let err_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, name_3 = _a.name, code = _a.code, minPrice = _a.minPrice, maxPrice = _a.maxPrice, minStock = _a.minStock, maxStock = _a.maxStock;
                        filters = {};
                        if (name_3)
                            filters.name = name_3;
                        if (code)
                            filters.code = code;
                        if (minPrice)
                            filters.price = __assign(__assign({}, filters.price), {$gte: minPrice});
                        if (maxPrice)
                            filters.price = __assign(__assign({}, filters.price), {$lte: maxPrice});
                        if (minStock)
                            filters.stock = __assign(__assign({}, filters.stock), {$gte: minStock});
                        if (maxStock)
                            filters.stock = __assign(__assign({}, filters.stock), {$lte: maxStock});
                        return [4 /* yield*/, products_1.ProductModel.findOne(filters)];
                    case 1:
                        product = _b.sent();
                        if (product)
                            res.status(200).json(product);
                        else
                            throw new Error("No product matches this search/properties");
                        return [3 /* break*/, 3];
                    case 2:
                        err_6 = _b.sent();
                        res.status(500).json(this.defaultError(err_6));
                        return [3 /* break*/, 3];
                    case 3: return [2];
                }
            });
        });
    };
    return MongodbProducts;
}());
exports.MongodbProducts = MongodbProducts;
