import {Request, Response} from "express";
import {ProductModel, IProduct} from "../models/products";
import {CartModel, ICart} from "../models/cart";

export class CartController {
  // Default error handler
  defaultError(err: Error): object {
    return {
      Error: `${err.message || "Unknown"}`,
      Status:
        "We are having problems connecting to the system, please try again later",
    };
  }

  // GET local cart
  async getLocalCart(): Promise<ICart> {
    let cart: ICart = {
      products: [],
      timestamp: new Date().toString(),
    };
    const localCartId: string | null = localStorage.getItem("cartId");
    if (localCartId) {
      const doc: ICart | null = await CartModel.findById(localCartId);
      if (doc) cart = doc;
    }
    return cart;
  }

  // GET current cart
  async getCart(req: Request, res: Response): Promise<Response | void> {
    try {
      const cart: ICart = await this.getLocalCart();
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json(this.defaultError(err as Error));
    }
  }

  // GET one Product
  async getCartProduct(req: Request, res: Response): Promise<Response | void> {
    try {
      const cart: ICart = await this.getLocalCart();
      let product: object = {};
      if (cart.products.length > 1) {
        const productInCart: object | undefined = cart.products.find(
          (elem) => (elem as IProduct)._id === req.params.id,
        );
        if (productInCart) product = productInCart;
      }
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(this.defaultError(err as Error));
    }
  }

  // ADD a new Product
  async addProduct(req: Request, res: Response): Promise<Response | void> {
    try {
      const cart: ICart = await this.getLocalCart();
      const {_id, timestamp, name, description, code, thumbnail, price, stock} =
        (await ProductModel.findById(req.params.id)) as IProduct;
      const itemIndex: number = cart.products.findIndex(
        (obj) => (obj as IProduct)._id === _id,
      );
      if (itemIndex !== -1) {
        (cart.products[itemIndex] as IProduct).quantityOnCart!++;
      } else {
        const newProductInCart: IProduct = {
          _id,
          timestamp,
          name,
          description,
          code,
          thumbnail,
          price,
          stock,
          quantityOnCart: 1,
        };
        cart.products.push(newProductInCart);
      }
      const updatedCart = new CartModel(cart);
      updatedCart.save(function (err, room) {
        localStorage.setItem("cartId", room._id);
        res.status(200).json({Status: "Product saved"});
      });
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
      const cart: ICart = await this.getLocalCart();

      const itemIndex: number = cart.products.findIndex(
        (obj) => (obj as IProduct)._id === req.params.id,
      );
      if (itemIndex !== -1) {
        cart.products.splice(itemIndex, 1);
        res.status(200).json({status: "Product Deleted"});
      } else {
        throw new Error("Product not found");
      }
    } catch (err) {
      res.status(500).json(this.defaultError(err as Error));
    }
  }
}
// asd
