import {Request, Response} from "express";
import {connectMySQL} from "../../models/mysql/cart-products";
import {IProduct} from "../../utils/modelsInterfaces";
import {mysqlKnexInstance} from "../../config/mysql.db";

export class MysqlProducts {
  constructor() {
    // MySQL connection
    connectMySQL();
  }

  // Default error handler
  defaultError(err: Error): object {
    return {
      Error: `${err.message || "Unknown"}`,
      Status:
        "We are having problems connecting to the system, please try again later",
    };
  }
  // GET all Products
  async getProducts(req: Request, res: Response): Promise<Response | void> {
    try {
      const products: IProduct[] = await mysqlKnexInstance("products").select(
        "*",
      );
      if (products.length === 0) throw new Error("Product list is empty");
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(this.defaultError(err as Error));
    }
  }

  // GET one Product
  async getProductById(req: Request, res: Response): Promise<Response | void> {
    try {
      const product: IProduct[] = await mysqlKnexInstance("products").where(
        "_id",
        req.params.id,
      );
      if (product.length === 0)
        throw new Error("The product is not added to the shopping cart");
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(this.defaultError(err as Error));
    }
  }

  // ADD a new Product
  async addProduct(req: Request, res: Response): Promise<Response | void> {
    try {
      const {name, description, code, thumbnail, price, stock} = req.body;
      const newProduct = {
        name,
        description,
        code: Math.round(code),
        thumbnail,
        price: price.toFixed(2),
        stock: Math.round(stock),
      };
      await mysqlKnexInstance("products").insert(newProduct);
      res.status(200).json({Status: "Product saved"});
    } catch (err) {
      res.status(500).json(this.defaultError(err as Error));
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
      const asd = await mysqlKnexInstance("products")
        .where({_id: req.params.id})
        .update(newProduct);
      console.log(asd);
      res.status(200).json({Status: "Product updated"});
    } catch (err) {
      res.status(500).json(this.defaultError(err as Error));
    }
  }

  // DELETE a Product
  async deleteProductById(
    req: Request,
    res: Response,
  ): Promise<Response | void> {
    try {
      const asd = await mysqlKnexInstance("products")
        .where({_id: req.params.id})
        .del();
      console.log(asd);
      res.status(200).json({status: "Product Deleted"});
    } catch (err) {
      res.status(500).json(this.defaultError(err as Error));
    }
  }
}
