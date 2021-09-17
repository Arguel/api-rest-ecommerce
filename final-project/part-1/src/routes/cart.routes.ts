import express from "express";
import {ProductModel} from "../models/products";
import {CartProductModel} from "../models/cart";
const router = express.Router();

// GET all Products
router.get("/", async (req: express.Request, res: express.Response) => {
  try {
    const productsInCart = await CartProductModel.find();
    res.status(200).json(productsInCart);
  } catch (err) {
    res.status(500).json({
      Error: `${(err as Error).message || "Unknown"}`,
      Status:
        "We are having problems connecting to the system, please try again later",
    });
  }
});

// GET one Product
router.get("/:id", async (req: express.Request, res: express.Response) => {
  try {
    const productInCart = await CartProductModel.findOne({
      productId: req.params.id,
    });
    res.status(200).json(productInCart);
  } catch (err) {
    res.status(500).json({
      Error: `${(err as Error).message || "Unknown"}`,
      Status:
        "We are having problems connecting to the system, please try again later",
    });
  }
});

// ADD a new Product
router.post("/:id", async (req: express.Request, res: express.Response) => {
  try {
    const {_id, timestamp, name, description, code, thumbnail, price, stock} =
      await ProductModel.findById(req.params.id);
    const newProductInCart = new CartProductModel({
      productId: _id,
      timestamp,
      name,
      description,
      code,
      thumbnail,
      price,
      stock,
    });
    await newProductInCart.save();
    res.status(200).json({Status: "Product saved"});
  } catch (err) {
    res.status(500).json({
      Error: `${(err as Error).message || "Unknown"}`,
      Status:
        "We are having problems connecting to the system, please try again later",
    });
  }
});

// DELETE a Product
router.delete("/:id", async (req: express.Request, res: express.Response) => {
  try {
    const cartProduct = await CartProductModel.findOne({
      productId: req.params.id,
    });
    if (cartProduct) {
      await CartProductModel.findByIdAndRemove(cartProduct._id);
      res.status(200).json({status: "Product Deleted"});
    } else {
      throw new Error("Product not found");
    }
  } catch (err) {
    res.status(500).json({
      Error: `${(err as Error).message || "Unknown"}`,
      Status:
        "We are having problems connecting to the system, please try again later",
    });
  }
});
export default router;
