import express from "express";
import {isAdmin} from "../middlewares/auth";
import {knexInstance} from "../databaseKnex";
const router = express.Router();

// GET all Products
router.get("/", async (req: express.Request, res: express.Response) => {
  try {
    const products = await knexInstance("products").select("*");
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({
      Error: `${(err as Error).message || "Unknown"}`,
      Status:
        "We are having problems connecting to the system, please try again later",
    });
  }
});

// GET one Product
router.get(
  "/:id",
  isAdmin,
  async (req: express.Request, res: express.Response) => {
    try {
      const product = await knexInstance("products").where(
        "_id",
        req.params.id,
      );
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({
        Error: `${(err as Error).message || "Unknown"}`,
        Status:
          "We are having problems connecting to the system, please try again later",
      });
    }
  },
);

// ADD a new Product
router.post(
  "/",
  isAdmin,
  async (req: express.Request, res: express.Response) => {
    try {
      const {name, description, code, thumbnail, price, stock} = req.body;
      await knexInstance("products").insert({
        timestamp: new Date().toString(),
        name,
        description,
        code: Math.round(code),
        thumbnail,
        price: price.toFixed(2),
        stock: Math.round(stock),
        __v: 0,
      });
      res.status(200).json({Status: "Product saved"});
    } catch (err) {
      res.status(500).json({
        Error: `${(err as Error).message || "Unknown"}`,
        Status:
          "We are having problems connecting to the system, please try again later",
      });
    }
  },
);

// UPDATE a Product
router.put(
  "/:id",
  isAdmin,
  async (req: express.Request, res: express.Response) => {
    try {
      const {name, description, code, thumbnail, price, stock} = req.body;
      const newProduct = {name, description, code, thumbnail, price, stock};
      await knexInstance("products")
        .where("_id", req.params.id)
        .update(newProduct);
      res.status(200).json({Status: "Product updated"});
    } catch (err) {
      res.status(500).json({
        Error: `${(err as Error).message || "Unknown"}`,
        Status:
          "We are having problems connecting to the system, please try again later",
      });
    }
  },
);

// DELETE a Product
router.delete(
  "/:id",
  isAdmin,
  async (req: express.Request, res: express.Response) => {
    try {
      await knexInstance("products").where("_id", req.params.id).del();
      res.status(200).json({status: "Product Deleted"});
    } catch (err) {
      res.status(500).json({
        Error: `${(err as Error).message || "Unknown"}`,
        Status:
          "We are having problems connecting to the system, please try again later",
      });
    }
  },
);

export default router;
