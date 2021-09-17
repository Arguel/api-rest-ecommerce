import express from "express";
import {isAdmin} from "../middlewares/auth";
import {
  getProducts,
  getProductById,
  addProduct,
  updateProductById,
  deleteProductById,
} from "../controller/products.controllers";

const router = express.Router();

// GET all Products
router.get("/", getProducts);

// GET one Product
router.get("/:id", isAdmin, getProductById);

// ADD a new Product
router.post("/", isAdmin, addProduct);

// UPDATE a Product
router.put("/:id", isAdmin, updateProductById);

// DELETE a Product
router.delete("/:id", isAdmin, deleteProductById);

export default router;
