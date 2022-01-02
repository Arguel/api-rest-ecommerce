"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartModel = void 0;
var mongoose_1 = require("mongoose");
var cartSchema = new mongoose_1.Schema({
    products: { type: [Object], required: true },
    timestamp: { type: String, required: true },
});
exports.CartModel = (0, mongoose_1.model)("Cart", cartSchema);
