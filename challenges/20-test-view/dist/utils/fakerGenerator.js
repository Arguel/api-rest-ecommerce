"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gen = void 0;
var faker_1 = __importDefault(require("faker"));
var gen = function (qty) {
    var items = [];
    for (var i = 0; i < qty; i++) {
        var product = {
            name: faker_1.default.commerce.productName(),
            price: faker_1.default.commerce.price(),
            thumbnail: faker_1.default.image.imageUrl(),
        };
        items.push(product);
    }
    return items;
};
exports.gen = gen;
