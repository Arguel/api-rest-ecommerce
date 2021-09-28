import {Request, Response} from "express";
import {ProductModel, IProduct} from "../models/products";
import {CartModel, ICart} from "../models/cart";

const cartId = "614a4346c63a6bed117cfdbb";

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
    const localCartId = cartId;
    if (localCartId) {
      const doc: ICart | null = await CartModel.findById(localCartId);
      if (doc) cart = doc;
    }
    return cart;
  }

  // GET current cart (GET)
  async getCart(req: Request, res: Response): Promise<Response | void> {
    try {
      const cart: ICart = await this.getLocalCart();
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json(this.defaultError(err as Error));
    }
  }

  // GET one Product (GET /:id)
  async getCartProduct(req: Request, res: Response): Promise<Response | void> {
    try {
      const cart: ICart = await this.getLocalCart();
      let product: object = {};
      const productInCart: object | undefined = cart.products.find(
        (elem) => (elem as IProduct)._id!.toString() === req.params.id,
      );
      if (productInCart) product = productInCart;
      else
        throw new Error(
          `The cart does not have this product added. You can add it by making an http PUT request to domain/cart/${req.params.id}`,
        );
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(this.defaultError(err as Error));
    }
  }

  // ADD a new Product (POST /:id)
  async addProduct(req: Request, res: Response): Promise<Response | void> {
    try {
      const cart: ICart = await this.getLocalCart();
      let itemIndex: number = -1;
      const {_id, timestamp, name, description, code, thumbnail, price, stock} =
        (await ProductModel.findById(req.params.id)) as IProduct;
      if (cart.products.length > 0)
        itemIndex = cart.products.findIndex(
          (obj) => (obj as IProduct)._id!.toString() === _id!.toString(),
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
      // cartId = updatedCart._id;
      await updatedCart.save();
      res.status(200).json({Status: "Product saved/updated"});
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
      const cart: ICart = await this.getLocalCart();

      const itemIndex: number = cart.products.findIndex(
        (obj) => (obj as IProduct)._id!.toString() === req.params.id,
      );
      if (itemIndex !== -1) {
        cart.products.splice(itemIndex, 1);
        const updatedCart = new CartModel(cart);
        await updatedCart.save();
        res.status(200).json({status: "Product Deleted"});
      } else {
        throw new Error("Product not found");
      }
    } catch (err) {
      res.status(500).json(this.defaultError(err as Error));
    }
  }
}
