"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const express_1 = require("express");
const cart_controllers_1 = require("../controller/cart.controllers");
const controller = new cart_controllers_1.CartController();
const router = (0, express_1.Router)();
// GET all Products
router.get("/", controller.getCart.bind(controller));
// GET one Product
router.get("/:id", controller.getCartProduct.bind(controller));
// ADD a new Product
router.post("/:id", controller.addProduct.bind(controller));
// DELETE a Product
router.delete("/:id", controller.deleteProductById.bind(controller));
exports.default = router;
