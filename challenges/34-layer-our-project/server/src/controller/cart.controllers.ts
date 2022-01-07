import {persistenceType} from "../database/factoryType";
import {Request, Response} from "express";
import {FactoryCart} from "./factory/cart";
import {ICrudCart} from "../libs/interfaces/crud.interfaces";

export class CartController implements ICrudCart {
  factory: ICrudCart;

  constructor() {
    /* Depending on the type of persistence selected in "/config/factoryType.ts" we will use
     * a particular database model or another */
    this.factory = FactoryCart.type(persistenceType);
  }
  getCart = (req: Request, res: Response) => {
    return this.factory.getCart(req, res);
  };
  getCartProductById = (req: Request, res: Response) => {
    return this.factory.getCartProductById(req, res);
  };
  addProduct = (req: Request, res: Response) => {
    return this.factory.addProduct(req, res);
  };
  deleteProductById = (req: Request, res: Response) => {
    return this.factory.deleteProductById(req, res);
  };
}
