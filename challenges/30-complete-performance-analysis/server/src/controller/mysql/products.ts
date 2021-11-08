import {Request, Response} from "express";
import {connectMySQL} from "../../models/mysql/cart-products";
import {IProduct} from "../../libs/interfaces/models.interfaces";
import {mysqlKnexInstance} from "../../database/mysql.db";
import {IRequestError} from "../../libs/interfaces/errors.interfaces";
import {INewProduct} from "../../libs/interfaces/crud.interfaces";

export class MysqlProducts {
  constructor() {
    // MySQL connection
    connectMySQL();
  }

  // Default error handler
  defaultError(err: Error): IRequestError {
    return {
      name: `${err.name || "Unknown"}`,
      message: `${err.message || "Unknown"}`,
      status:
        "We are having problems connecting to the system, please try again later",
    };
  }
  // GET all Products (GET)
  async getProducts(req: Request, res: Response): Promise<void> {
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

  // GET one Product (GET /:id)
  async getProductById(req: Request, res: Response): Promise<void> {
    try {
      const product: IProduct[] = await mysqlKnexInstance("products").where(
        "_id",
        req.params.id,
      );
      if (product.length === 0)
        throw new Error(
          "The product is not added. You can add it by making an http POST request to domain/products",
        );
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(this.defaultError(err as Error));
    }
  }

  // ADD a new Product (POST /:id)
  async addProduct(req: Request, res: Response): Promise<void> {
    try {
      // We extract the properties from the request body
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

  // UPDATE a Product (PUT /:id)
  async updateProductById(req: Request, res: Response): Promise<void> {
    try {
      // We extract the properties from the request body
      const {name, description, code, thumbnail, price, stock} = req.body;
      const newProduct: INewProduct = {
        name,
        description,
        code,
        thumbnail,
        price,
        stock,
      };
      // We update the product if it exists
      const result = await mysqlKnexInstance("products")
        .where({_id: req.params.id})
        .update(newProduct);
      if (result) res.status(200).json({Status: "Product updated"});
      else
        throw new Error(
          "The product could not be updated / The product does not exist in the shopping cart",
        );
    } catch (err) {
      res.status(500).json(this.defaultError(err as Error));
    }
  }

  // DELETE a Product (DELETE /:id)
  async deleteProductById(req: Request, res: Response): Promise<void> {
    try {
      // We delete the product from the database
      const result = await mysqlKnexInstance("products")
        .where({_id: req.params.id})
        .del();
      if (result) res.status(200).json({status: "Product Deleted"});
      else
        throw new Error(
          "The product could not be found / The product does not exist in the shopping cart",
        );
    } catch (err) {
      res.status(500).json(this.defaultError(err as Error));
    }
  }

  // Filter the products (POST)
  async filter(req: Request, res: Response): Promise<void> {
    try {
      // We extract the properties from the request body
      const {name, code, minPrice, maxPrice, minStock, maxStock} = req.body;
      const result: IProduct[] = await mysqlKnexInstance("products")
        .modify((cxn) => {
          if (name) cxn.where({name});
        })
        .modify((cxn) => {
          if (code) cxn.where({code});
        })
        .modify((cxn) => {
          if (minPrice) cxn.where("price", ">=", minPrice);
        })
        .modify((cxn) => {
          if (maxPrice) cxn.where("price", "<=", maxPrice);
        })
        .modify((cxn) => {
          if (minStock) cxn.where("stock", ">=", minStock);
        })
        .modify((cxn) => {
          if (maxStock) cxn.where("stock", "<=", maxStock);
        });

      if (result.length > 0) res.status(200).json(result[0]);
      else throw new Error("No product matches this search/properties");
    } catch (err) {
      res.status(500).json(this.defaultError(err as Error));
    }
  }
}
