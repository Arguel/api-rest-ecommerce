import { FsHandler } from "./fshandler.js";
import express from "express";
export const router = express.Router();

const handler = new FsHandler("products.json");

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const products = await handler.readData();
    if (id >= 1 && id <= products.length - 1) res.json(products[id]);
    else res.json({ error: "product not found" });
  } catch (error) {
    console.error(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await handler.readData();
    res.json(products);
  } catch (error) {
    console.error(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const product = await handler.save(req.body);
    res.json(product);
  } catch (error) {
    console.error(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const products = await handler.readData();
    if (id >= 1 && id <= products.length - 1) {
      const item = await handler.updateById(req.body, id);
      res.json(item);
    } else res.json({ error: "product not found" });
  } catch (error) {
    console.error(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const products = await handler.readData();
    if (id >= 1 && id <= products.length - 1) {
      await handler.deleteById(id);
      res.json({ deleted: `product ${id}` });
    } else res.json({ error: "product not found" });
  } catch (error) {
    console.error(error);
  }
});
