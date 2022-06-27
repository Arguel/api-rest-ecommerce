const fs = require("fs");
const express = require("express");
const app = express();
const port = 8080;

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let [itemsVC, itemRandomVC] = [0, 0];

app.get("/items", async (req, res) => {
  try {
    const rawData = await fs.promises.readFile("products.json", "utf-8");
    const data = JSON.parse(rawData.toString("utf-8"), null, "\t");
    res.json({
      items: data,
      quantity: data.length,
    });
    itemsVC++;
  } catch {
    res.send(
      "Unable to load the /items path at the moment, please try again later",
    );
    throw new Error(
      "Unable to load the /items path at the moment, please try again later",
    );
  }
});

app.get("/item-random", async (req, res) => {
  try {
    const rawData = await fs.promises.readFile("products.json", "utf-8");
    const data = JSON.parse(rawData.toString("utf-8"), null, "\t");
    res.json({
      item: data[randomInteger(0, data.length - 1)],
    });
    itemRandomVC++;
  } catch {
    res.send(
      "Unable to load the /item-random path at the moment, please try again later",
    );
    throw new Error(
      "Unable to load the /item-random path at the moment, please try again later",
    );
  }
});

app.get("/views", async (req, res) => {
  res.json({
    "/items": itemsVC,
    "/item-random": itemRandomVC,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
