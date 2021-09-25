import {MongodbProducts} from "../mongodb/products";
import {Request, Response} from "express";

export interface ICrudProducts {
  getProducts(req: Request, res: Response): Promise<Response | void>;
  getProductById(req: Request, res: Response): Promise<Response | void>;
  addProduct(req: Request, res: Response): Promise<Response | void>;
  updateProductById(req: Request, res: Response): Promise<Response | void>;
  deleteProductById(req: Request, res: Response): Promise<Response | void>;
}

export class FactoryProducts {
  type(type: string): ICrudProducts {
    switch (type) {
      case "mongodb":
        return new MongodbProducts();
      case "mysql":
        return new MysqlProducts();
      default:
        return new MongodbProducts();
    }
  }
}
