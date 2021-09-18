"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cart_controllers_1 = require("../controller/cart.controllers");
var controller = new cart_controllers_1.CartController();
var router = express_1.default.Router();
// GET all Products
router.get("/", controller.getProducts);
// GET one Product
router.get("/:id", controller.getProductById);
// ADD a new Product
router.post("/:id", controller.addProduct);
// DELETE a Product
router.delete("/:id", controller.deleteProductById);
exports.default = router;
