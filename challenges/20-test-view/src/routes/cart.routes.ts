import {Router} from "express";
import {CartController} from "../controller/cart.controllers";

const controller: CartController = new CartController();

const router: Router = Router();

// GET all Products
router.get("/", controller.getCart.bind(controller));

// GET one Product
router.get("/:id", controller.getCartProductById.bind(controller));

// ADD a new Product
router.post("/:id", controller.addProduct.bind(controller));

// DELETE a Product
router.delete("/:id", controller.deleteProductById.bind(controller));

export default router;
