"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var admin_1 = require("../middlewares/admin");
var products_controllers_1 = require("../controller/products.controllers");
var controller = new products_controllers_1.ProductsController();
var router = (0, express_1.Router)();
// GET all Products
router.get("/", controller.getProducts.bind(controller));
// GET one Product
router.get("/:id", admin_1.isAdmin, controller.getProductById.bind(controller));
// ADD a new Product
router.post("/", admin_1.isAdmin, controller.addProduct.bind(controller));
// UPDATE a Product
router.put("/:id", admin_1.isAdmin, controller.updateProductById.bind(controller));
// DELETE a Product
router.delete("/:id", admin_1.isAdmin, controller.deleteProductById.bind(controller));
// FILTER a Product
router.post("/filter", controller.filter.bind(controller));
exports.default = router;
