"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cart_controllers_1 = require("../controller/cart.controllers");
var controller = new cart_controllers_1.CartController();
var router = (0, express_1.Router)();
// GET all Products
router.get("/", controller.getCart);
// GET one Product
router.get("/:id", controller.getCartProductById);
// ADD a new Product
router.post("/:id", controller.addProduct);
// DELETE a Product
router.delete("/:id", controller.deleteProductById);
exports.default = router;
