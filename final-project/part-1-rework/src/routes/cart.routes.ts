import {Router} from "express";
import {CartController} from "../controller/cart.controllers";

const controller: CartController = new CartController();

const router: Router = Router();

// GET all Products
router.get("/", controller.getProducts);

// GET one Product
router.get("/:id", controller.getProductById);

// ADD a new Product
router.post("/:id", controller.addProduct);

// DELETE a Product
router.delete("/:id", controller.deleteProductById);

export default router;
