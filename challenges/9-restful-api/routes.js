const express = require("express");
const router = express.Router();

let products = [
  {
    title: "water",
    price: "200",
    thumbnail: "./img/water.png",
    id: 0,
  },
  {
    title: "orange",
    price: "10",
    thumbnail: "./img/orange.png",
    id: 1,
  },
  {
    title: "milk",
    price: "90",
    thumbnail: "./img/milk.png",
    id: 2,
  },
];

router.get("/products/list", (req, res) => {
  if (products.length)
    res.json(products);
   else
    res.json({
      error: "No products loaded",
    });
});

router.get("/products/list/:id", (req, res) => {
  const productId = req.params.id;
  if (productId >= 0 && productId <= products.length - 1)
    res.json(products[productId]);
   else
    res.send("Product not found");
});

router.post("/products/save", (req, res) => {
  const data = req.body;
  products = [...products, {...data, id: products.length}];
  res.json(products);
});

router.put("/products/update/:id", (req, res) => {
  const productId = req.params.id;
  if (productId >= 0 && productId <= products.length - 1) {
    products[productId] = {...req.body, id: productId};
    res.json(products[productId]);
  } else {
    res.send("Product not found");
  }
});

router.delete("/products/delete/:id", (req, res) => {
  const productId = req.params.id;
  if (productId >= 0 && productId <= products.length - 1) {
    const deletedItem = products.splice(productId, 1);
    res.json(deletedItem[0]);
  } else {
    res.send("Product not found");
  }
});

module.exports = router;
