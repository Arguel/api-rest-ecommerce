import {Request, Response} from "express";
import {ProductModel} from "../models/products";

export class ProductsController {
  // GET all Products
  async getProducts(req: Request, res: Response): Promise<Response | void> {
    try {
      const products = await ProductModel.find();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({
        Error: `${(err as Error).message || "Unknown"}`,
        Status:
          "We are having problems connecting to the system, please try again later",
      });
    }
  }

  // GET one Product
  async getProductById(req: Request, res: Response): Promise<Response | void> {
    try {
      const product = await ProductModel.findById(req.params.id);
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({
        Error: `${(err as Error).message || "Unknown"}`,
        Status:
          "We are having problems connecting to the system, please try again later",
      });
    }
  }

  // ADD a new Product
  async addProduct(req: Request, res: Response): Promise<Response | void> {
    try {
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
      res.status(200).json({Status: "Product saved"});
    } catch (err) {
      res.status(500).json({
        Error: `${(err as Error).message || "Unknown"}`,
        Status:
          "We are having problems connecting to the system, please try again later",
      });
    }
  }

  // UPDATE a Product
  async updateProductById(
    req: Request,
    res: Response,
  ): Promise<Response | void> {
    try {
      const {name, description, code, thumbnail, price, stock} = req.body;
      const newProduct = {name, description, code, thumbnail, price, stock};
      await ProductModel.findByIdAndUpdate(req.params.id, newProduct);
      res.status(200).json({Status: "Product updated"});
    } catch (err) {
      res.status(500).json({
        Error: `${(err as Error).message || "Unknown"}`,
        Status:
          "We are having problems connecting to the system, please try again later",
      });
    }
  }

  // DELETE a Product
  async deleteProductById(
    req: Request,
    res: Response,
  ): Promise<Response | void> {
    try {
      await ProductModel.findByIdAndRemove(req.params.id);
      res.status(200).json({status: "Product Deleted"});
    } catch (err) {
      res.status(500).json({
        Error: `${(err as Error).message || "Unknown"}`,
        Status:
          "We are having problems connecting to the system, please try again later",
      });
    }
  }
}
