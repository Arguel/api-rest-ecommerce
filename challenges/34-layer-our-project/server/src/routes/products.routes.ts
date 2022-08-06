import {Router, IRouter} from "express";
import {isAdmin} from "../middlewares/admin";
import {ProductsController} from "../controller/products.controllers";

const controller: ProductsController = new ProductsController();

const router: IRouter = Router();

// GET all Products
router.get("/", controller.getProducts);

// GET one Product
router.get("/:id", isAdmin, controller.getProductById);

// ADD a new Product
router.post("/", isAdmin, controller.addProduct);

// UPDATE a Product
router.put("/:id", isAdmin, controller.updateProductById);

// DELETE a Product
router.delete("/:id", isAdmin, controller.deleteProductById);

// FILTER a Product
router.post("/filter", controller.filter);

export default router;
