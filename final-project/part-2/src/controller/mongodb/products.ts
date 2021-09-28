import {Request, Response} from "express";
import {ProductModel} from "../../models/mongodb/products";
import {IProduct} from "../../utils/modelsInterfaces";
import {connectMongoDB} from "../../config/mongodb.db";

export class MongodbProducts {
  constructor() {
    // MongoDB connection
    connectMongoDB();
  }

  // Default error handler
  defaultError(err: Error): object {
    return {
      Error: `${err.message || "Unknown"}`,
      Status:
        "We are having problems connecting to the system, please try again later",
    };
  }
  // GET all Products (GET)
  async getProducts(req: Request, res: Response): Promise<Response | void> {
    try {
      const products: IProduct[] = await ProductModel.find();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(this.defaultError(err as Error));
    }
  }

  // GET one Product (GET /:id)
  async getProductById(req: Request, res: Response): Promise<Response | void> {
    try {
      const product: IProduct = (await ProductModel.findById(
        req.params.id,
      )) as IProduct;
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(this.defaultError(err as Error));
    }
  }

  // ADD a new Product (POST /:id)
  async addProduct(req: Request, res: Response): Promise<Response | void> {
    try {
      // We extract the properties from the request body
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
      res.status(500).json(this.defaultError(err as Error));
    }
  }

  // UPDATE a Product (PUT /:id)
  async updateProductById(
    req: Request,
    res: Response,
  ): Promise<Response | void> {
    try {
      // We extract the properties from the request body
      const {name, description, code, thumbnail, price, stock} = req.body;
      const newProduct = {name, description, code, thumbnail, price, stock};
      // We update the product if it exists
      await ProductModel.findByIdAndUpdate(req.params.id, newProduct);
      res.status(200).json({Status: "Product updated"});
    } catch (err) {
      res.status(500).json(this.defaultError(err as Error));
    }
  }

  // DELETE a Product (DELETE /:id)
  async deleteProductById(
    req: Request,
    res: Response,
  ): Promise<Response | void> {
    try {
      // We delete the product from the database
      await ProductModel.findByIdAndRemove(req.params.id);
      res.status(200).json({status: "Product Deleted"});
    } catch (err) {
      res.status(500).json(this.defaultError(err as Error));
    }
  }
}
