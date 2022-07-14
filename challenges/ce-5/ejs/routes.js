const FsHandler = require("./fshandler");
const express = require("express");
const router = express.Router();

const handler = new FsHandler("products.json");

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const products = await handler.readData();
    if (id >= 1 && id <= products.length) res.json(products[id - 1]);
    else res.json({ error: "product not found" });
  } catch (error) {
    console.error(error);
    res.json({ error: "product not found" });
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await handler.readData();
    if (products.length > 0) res.render("index", { products });
    else res.json({ error: "there are no products" });
  } catch (error) {
    console.error(error);
    res.json({ error: "there are no products" });
  }
});

router.post("/", async (req, res) => {
  try {
    const product = await handler.save(req.body);
    // res.json(product);
    res.redirect("/api/products");
  } catch (error) {
    console.error(error);
    res.json({ error: "could not save product, write error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const products = await handler.readData();
    if (id >= 1 && id <= products.length) {
      const item = await handler.updateById(req.body, id);
      res.json(item);
    } else res.json({ error: "product not found" });
  } catch (error) {
    console.error(error);
    res.json({ error: "product not found" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const products = await handler.readData();
    if (id >= 1 && id <= products.length) {
      await handler.deleteById(id);
      res.json({ deleted: `product ${id}` });
    } else res.json({ error: "product not found" });
  } catch (error) {
    console.error(error);
    res.json({ error: "product not found" });
  }
});

module.exports = router;
