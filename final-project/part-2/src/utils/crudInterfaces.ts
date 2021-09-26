import {Request, Response} from "express";

export interface ICrudProducts {
  getProducts(req: Request, res: Response): Promise<Response | void>;
  getProductById(req: Request, res: Response): Promise<Response | void>;
  addProduct(req: Request, res: Response): Promise<Response | void>;
  updateProductById(req: Request, res: Response): Promise<Response | void>;
  deleteProductById(req: Request, res: Response): Promise<Response | void>;
}

export interface ICrudCart {
  getCart(req: Request, res: Response): Promise<Response | void>;
  getCartProduct(req: Request, res: Response): Promise<Response | void>;
  addProduct(req: Request, res: Response): Promise<Response | void>;
  deleteProductById(req: Request, res: Response): Promise<Response | void>;
}
