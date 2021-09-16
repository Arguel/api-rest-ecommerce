import express from "express";
import {knexInstance} from "../databaseKnex";
const router = express.Router();

// GET all Products
router.get("/", async (req: express.Request, res: express.Response) => {
  try {
    const productsInCart = await knexInstance("cartProducts").select("*");
    res.status(200).json(productsInCart);
  } catch (err) {
    res.status(500).json({
      Error: `${(err as Error).message || "Unknown"}`,
      Status:
        "We are having problems connecting to the system, please try again later",
    });
  }
});

// GET one Product
router.get("/:id", async (req: express.Request, res: express.Response) => {
  try {
    const productInCart = await knexInstance("cartProducts").where(
      "productId",
      req.params.id,
    );
    res.status(200).json(productInCart);
  } catch (err) {
    res.status(500).json({
      Error: `${(err as Error).message || "Unknown"}`,
      Status:
        "We are having problems connecting to the system, please try again later",
    });
  }
});

// ADD a new Product
router.post("/:id", async (req: express.Request, res: express.Response) => {
  try {
    const newProduct: object[] = await knexInstance("products").where(
      "_id",
      req.params.id,
    );
    const {_id, timestamp, name, description, code, thumbnail, price, stock} =
      newProduct[0];
    await knexInstance("cartProducts").insert({
      productId: _id,
      timestamp,
      name,
      description,
      code,
      thumbnail,
      price,
      stock,
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
});

// DELETE a Product
router.delete("/:id", async (req: express.Request, res: express.Response) => {
  try {
    await knexInstance("cartProducts").where("productId", req.params.id).del();
    res.status(200).json({status: "Product Deleted"});
  } catch (err) {
    res.status(500).json({
      Error: `${(err as Error).message || "Unknown"}`,
      Status:
        "We are having problems connecting to the system, please try again later",
    });
  }
});
export default router;
