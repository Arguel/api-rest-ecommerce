import {Request, Response} from "express";

export interface ICrudProducts {
  getProducts(req: Request, res: Response): Promise<Response | void>;
  getProductById(req: Request, res: Response): Promise<Response | void>;
  addProduct(req: Request, res: Response): Promise<Response | void>;
  updateProductById(req: Request, res: Response): Promise<Response | void>;
  deleteProductById(req: Request, res: Response): Promise<Response | void>;
  filter(req: Request, res: Response): Promise<Response | void>;
}

export interface ICrudCart {
  getCart(req: Request, res: Response): Promise<Response | void>;
  getCartProductById(req: Request, res: Response): Promise<Response | void>;
  addProduct(req: Request, res: Response): Promise<Response | void>;
  deleteProductById(req: Request, res: Response): Promise<Response | void>;
}

export interface IQueryProduct {
  name?: string;
  code?: number;
  price?: {
    $gte?: number;
    $lte?: number;
  };
  stock?: {
    $gte?: number;
    $lte?: number;
  };
}

export interface INewProduct {
  name: string;
  description: string;
  code: number;
  thumbnail: string;
  price: number;
  stock: number;
}
