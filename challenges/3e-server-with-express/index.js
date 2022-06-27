const FsHandler = require("./fsHandler");
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const handler = new FsHandler("products.json");

app.get("/products", async (req, res) => {
  try {
    await handler.init();
    res.json(handler.getAll());
  } catch (error) {
    console.error(error);
  }
});

app.get("/product-random", async (req, res) => {
  try {
    await handler.init();
    const products = handler.getAll();
    res.json(handler.getById(randomInteger(1, products.length)));
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
