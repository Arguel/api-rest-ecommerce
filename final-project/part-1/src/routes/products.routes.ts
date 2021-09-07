import express from "express";
import {ProductModel} from "../models/products";
const router = express.Router();

// GET all Products
router.get("/", async (req: express.Request, res: express.Response) => {
  const products = await ProductModel.find();
  res.json(products);
});

// GET one Product
router.get("/:id", async (req: express.Request, res: express.Response) => {
  const product = await ProductModel.findById(req.params.id);
  res.json(product);
});

// ADD a new Product
router.post("/", async (req: express.Request, res: express.Response) => {
  const {name, description, code, thumbnail, price, stock} = req.body;
  const newProduct = new ProductModel({
    timestamp: new Date().toString(),
    name,
    description,
    code: Math.round(code),
    thumbnail,
    price: price.toFixed(2),
    stock: Math.round(stock),
  });
  await newProduct.save();
  res.json({Status: "Product saved"});
});

// UPDATE a Product
router.put("/", async (req: express.Request, res: express.Response) => {
  const {name, description, code, thumbnail, price, stock} = req.body;
  const newProduct = {name, description, code, thumbnail, price, stock};
  await ProductModel.findByIdAndUpdate(req.params.id, newProduct);
  res.json({Status: "Product Updated"});
});

// DELETE a Product
router.delete("/", async (req: express.Request, res: express.Response) => {
  await ProductModel.findByIdAndRemove(req.params.id);
  res.json({status: "Product Deleted"});
});

export default router;
