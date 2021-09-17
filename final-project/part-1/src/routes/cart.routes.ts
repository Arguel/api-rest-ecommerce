import express from "express";
import {
  getProducts,
  getProductById,
  addProduct,
  deleteProductById,
} from "../controller/cart.controllers";

const router = express.Router();

// GET all Products
router.get("/", getProducts);

// GET one Product
router.get("/:id", getProductById);

// ADD a new Product
router.post("/:id", addProduct);

// DELETE a Product
router.delete("/:id", deleteProductById);

export default router;
