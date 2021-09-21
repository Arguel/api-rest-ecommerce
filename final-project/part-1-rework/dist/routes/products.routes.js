"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const products_controllers_1 = require("../controller/products.controllers");
const controller = new products_controllers_1.ProductsController();
const router = (0, express_1.Router)();
// GET all Products
router.get("/", controller.getProducts);
// GET one Product
router.get("/:id", auth_1.isAdmin, controller.getProductById);
// ADD a new Product
router.post("/", auth_1.isAdmin, controller.addProduct);
// UPDATE a Product
router.put("/:id", auth_1.isAdmin, controller.updateProductById);
// DELETE a Product
router.delete("/:id", auth_1.isAdmin, controller.deleteProductById);
exports.default = router;
