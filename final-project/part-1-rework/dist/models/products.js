"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
var mongoose_1 = require("mongoose");
var productSchema = new mongoose_1.Schema({
    _id: String,
    timestamp: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    quantityOnCart: Number,
});
exports.ProductModel = (0, mongoose_1.model)("Product", productSchema);
