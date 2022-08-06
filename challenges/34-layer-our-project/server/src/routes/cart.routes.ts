import {Router, IRouter} from "express";
import {CartController} from "../controller/cart.controllers";

const controller: CartController = new CartController();

const router: IRouter = Router();

// GET all Products
router.get("/", controller.getCart);

// GET one Product
router.get("/:id", controller.getCartProductById);

// ADD a new Product
router.post("/:id", controller.addProduct);

// DELETE a Product
router.delete("/:id", controller.deleteProductById);

export default router;
