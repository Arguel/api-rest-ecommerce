import {Request, Response} from "express";
import {connectMySQL} from "../../models/mysql/cart-products";
import {ICart, IProduct} from "../../utils/modelsInterfaces";
import {mysqlKnexInstance} from "../../config/mysql.db";

const cartId = "1";

export class MysqlCart {
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

  // GET local cart
  async getLocalCart(req: Request): Promise<ICart> {
    let cart: ICart = {
      products: [],
    };
    const localCartId = cartId;
    if (localCartId) {
      const doc: unknown[] = await mysqlKnexInstance("carts").where(
        "_id",
        cartId,
      );
      if (doc.length > 0) cart = doc as unknown as ICart;
    }
    return cart;
  }

  // GET current cart (GET)
  async getCart(req: Request, res: Response): Promise<Response | void> {
    try {
      const cart: ICart = await this.getLocalCart(req);
      console.log(cart);
      if (cart.products.length === 0)
        throw new Error("The shopping cart is empty");
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json(this.defaultError(err as Error));
    }
  }

  // GET one Product (GET /:id)
  async getCartProductById(
    req: Request,
    res: Response,
  ): Promise<Response | void> {
    try {
      const cart: ICart = await this.getLocalCart(req);
      let product: object = {};
      const productInCart: object | undefined = cart.products.find(
        (elem) => (elem as IProduct)._id === req.params.id,
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
      const cart: ICart = await this.getLocalCart(req);
      let itemIndex: number = -1;
      const {_id, timestamp, name, description, code, thumbnail, price, stock} =
        (await mysqlKnexInstance("products").where(
          "_id",
          req.params.id,
        )) as unknown as IProduct;
      if (cart.products.length > 0)
        itemIndex = cart.products.findIndex(
          (obj) => (obj as IProduct)._id === _id,
        );
      if (itemIndex !== -1) {
        (cart.products[itemIndex] as IProduct).quantityOnCart!++;
        await mysqlKnexInstance("carts").where({_id: cartId}).update(cart);
      } else {
        // This item is extracted from the "products" database
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
        await mysqlKnexInstance("carts").insert(cart);
      }
      // cartId = updatedCart._id;
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
      const cart: ICart = await this.getLocalCart(req);

      const itemIndex: number = cart.products.findIndex(
        (obj) => (obj as IProduct)._id === req.params.id,
      );
      if (itemIndex !== -1) {
        cart.products.splice(itemIndex, 1);
        await mysqlKnexInstance("carts").where({_id: cartId}).update(cart);
        res.status(200).json({status: "Product Deleted"});
      } else {
        throw new Error("Product not found");
      }
    } catch (err) {
      res.status(500).json(this.defaultError(err as Error));
    }
  }
}
