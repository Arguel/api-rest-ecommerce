import {Router} from "express";
import {isAdmin} from "../middlewares/auth";
import {ProductsController} from "../controller/products.controllers";

const controller: ProductsController = new ProductsController();

const router: Router = Router();

// GET all Products
router.get("/", controller.getProducts.bind(controller));

// MOCK API
router.get("/view-test/:qty?", controller.viewTest.bind(controller));

// GET one Product
router.get("/:id", isAdmin, controller.getProductById.bind(controller));

// ADD a new Product
router.post("/", isAdmin, controller.addProduct.bind(controller));

// UPDATE a Product
router.put("/:id", isAdmin, controller.updateProductById.bind(controller));

// DELETE a Product
router.delete("/:id", isAdmin, controller.deleteProductById.bind(controller));

// FILTER a Product
router.post("/filter", controller.filter.bind(controller));

export default router;
