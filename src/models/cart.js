"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
exports.CartProductModel = void 0;
const mongoose_1 = require("mongoose");
const cartProductSchema = new mongoose_1.Schema({
    productId: {type: String, required: true},
    timestamp: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    code: {type: Number, required: true},
    thumbnail: {type: String, required: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true},
});
exports.CartProductModel = (0, mongoose_1.model)("CartProduct", cartProductSchema);
