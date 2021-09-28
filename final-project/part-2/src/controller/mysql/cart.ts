import {Request, Response} from "express";
import {connectMySQL} from "../../models/mysql/cart-products";
import {ICart, IProduct} from "../../utils/modelsInterfaces";
import {mysqlKnexInstance} from "../../config/mysql.db";

const cartId = "13";

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
      if (doc.length > 0) {
        const docCart: ICart = doc[0] as ICart;
        docCart.products = JSON.parse(docCart.products as unknown as string);
        cart = docCart;
      }
    }
    return cart;
  }

  // GET current cart (GET)
  async getCart(req: Request, res: Response): Promise<Response | void> {
    try {
      const cart: ICart = await this.getLocalCart(req);
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
      console.log(cart);
      const productInCart: object | undefined = cart.products.find(
        (elem) => (elem as IProduct)._id === parseInt(req.params.id),
      );
      console.log(productInCart);
      if (productInCart) product = productInCart;
      else
        throw new Error(
          `The cart does not have this product added. You can add it by making an http POST request to domain/cart/${req.params.id}`,
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
      let result: boolean = false; // To see if the request was successful
      let itemIndex: number = -1; // To manage item units

      // We search our database "products" for the item with the id supplied by (req.params.id) to add it to the cart
      const products: IProduct[] = await mysqlKnexInstance("products").where(
        "_id",
        req.params.id,
      );

      // In case the product does not exist in the product database
      if (products.length === 0)
        throw new Error("No product with that id was found");

      // We extract the properties from the object that the database brings us
      const {_id, timestamp, name, description, code, thumbnail, price, stock} =
        products[0];

      // We check if it is already added to the shopping cart
      if (cart.products.length > 0)
        itemIndex = cart.products.findIndex(
          (obj) => (obj as IProduct)._id === _id,
        );
      // If it is already added to the cart, we add a unit
      if (itemIndex !== -1) {
        (cart.products[itemIndex] as IProduct).quantityOnCart!++;
        result = await mysqlKnexInstance("carts")
          .where({_id: cartId})
          .update({products: JSON.stringify(cart.products)});
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

        // We check if there is already a cart created so we do not create a duplicate cart
        if (cart._id)
          result = await mysqlKnexInstance("carts")
            .where({_id: cartId})
            .update({
              products: JSON.stringify(cart.products),
            });
        else
          result = await mysqlKnexInstance("carts").insert({
            products: JSON.stringify(cart.products),
          });
      }
      // cartId = updatedCart._id;
      if (result) res.status(200).json({Status: "Product saved/updated"});
      else
        throw new Error(
          "The product could not be added / updated, check that the information matches the schema",
        );
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
