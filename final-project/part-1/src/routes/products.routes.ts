import express from "express";
import {isAdmin} from "../middlewares/auth";
import {ProductsController} from "../controller/products.controllers";

const controller: ProductsController = new ProductsController();

const router = express.Router();

// GET all Products
router.get("/", controller.getProducts);

// GET one Product
router.get("/:id", isAdmin, controller.getProductById);

// ADD a new Product
router.post("/", isAdmin, controller.addProduct);

// UPDATE a Product
router.put("/:id", isAdmin, controller.updateProductById);

// DELETE a Product
router.delete("/:id", isAdmin, controller.deleteProductById);

export default router;
