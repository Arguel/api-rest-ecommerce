import {Request, Response} from "express";
import {ProductModel} from "../models/products";
import {CartModel, ICart} from "../models/cart";

Math.random().toString(16);

export class CartController {
  // GET local cart
  async getLocalCart() {
    let cart = {};
    const localCartId: string | null = localStorage.getItem("cartId");
    if (localCartId) {
      const doc: ICart | null = await CartModel.findById(localCartId);
      if (doc) cart = doc;
    }
    return cart;
  }

  // GET all Products
  async getCart(req: Request, res: Response): Promise<Response | void> {
    try {
      const cart = await this.getLocalCart();
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json({
        Error: `${(err as Error).message || "Unknown"}`,
        Status:
          "We are having problems connecting to the system, please try again later",
      });
    }
  }

  // GET one Product
  async getCartProduct(req: Request, res: Response): Promise<Response | void> {
    try {
      const productInCart = await CartModel.findOne({
        productId: req.params.id,
      });
      res.status(200).json(productInCart);
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
      const {_id, timestamp, name, description, code, thumbnail, price, stock} =
        await ProductModel.findById(req.params.id);
      const newProductInCart: object = {
        products: [
          {
            productId: _id,
            timestamp,
            name,
            description,
            code,
            thumbnail,
            price,
            stock,
          },
        ],
      };
      const updatedCart = new CartModel(newProductInCart);
      let cart: object = {};
      const localCartId: string | null = localStorage.getItem("cartId");
      if (localCartId) {
        cart = CartModel.findById(localCartId);
      }
      await updatedCart.save(function (err, room) {
        localStorage.setItem("cartId", room._id);
      });
      res.status(200).json({Status: "Product saved"});
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
      const cartProduct = await CartModel.findOne({
        productId: req.params.id,
      });
      if (cartProduct) {
        await CartModel.findByIdAndRemove(cartProduct._id);
        res.status(200).json({status: "Product Deleted"});
      } else {
        throw new Error("Product not found");
      }
    } catch (err) {
      res.status(500).json({
        Error: `${(err as Error).message || "Unknown"}`,
        Status:
          "We are having problems connecting to the system, please try again later",
      });
    }
  }
}
